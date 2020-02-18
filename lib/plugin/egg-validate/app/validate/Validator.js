'use strict';

const { cloneDeep } = require('lodash');
const { getOwnKeys, ownKeysFilter } = require('./util');
const { ParameterException } = require('./HttpException');
const { RuleResult, RuleField } = require('./Rule');

class Validator {
  constructor(rules, params) {
    this.rules = rules; // _Valiataor实例{}
    this.ctx = rules.ctx; // Egg.Context
    this.params = params; // [ e.g. 'query' ]

    this.data = {};
    this.parsed = {};
    this.verifyValues = {};

    this.init();
  }

  // init 参数初始化
  // 校验 rules Rule实例
  init() {
    const params = this.getHttpParams(this.ctx);
    this.data = cloneDeep(params);
    this.parsed = cloneDeep(params);
  }

  async validate() {
    const ruleOwnKeys = getOwnKeys(this.rules, {
      filter: ownKeysFilter.bind(this.rules),
    });
    // console.log('ruleOwnKeys', ruleOwnKeys);
    const errorMsgs = [];
    for (const key of ruleOwnKeys) {
      const result = await this.check(key);
      if (!result.success) {
        errorMsgs.push(result.msg);
      }
    }
    if (errorMsgs.length !== 0) {
      throw new ParameterException(errorMsgs); // [ msg ]
    }
    return this.getValue(this.params);
  }

  async check(key) {
    const isFunction = typeof (this.rules[key]) === 'function';
    let result;
    if (isFunction) {
      try {
        // key 为函数
        await this.rules[key](this.data);
        result = new RuleResult(true); // { pass: false, msg: '' }
      } catch (e) {
        result = new RuleResult(false, e.msg || e.message || '参数错误');
      }
    } else {
      // key 为普通字段
      const rule = this.rules[key];
      const ruleField = new RuleField(rule);

      const param = this.findParam(key); // e.g. { value: 'nickname' }
      result = ruleField.validate(param.value);

      this.verifyValues[key] = result.legalValue; // 存储参数
    }

    if (!result.pass) {
      const msg = `${isFunction ? '' : key}${result.msg}`;
      return {
        msg,
        success: false,
      };
    }
    return {
      msg: '参数校验完成',
      success: true,
    };
  }

  /**
   * @see https://eggjs.org/zh-cn/basics/controller.html#获取-http-请求参数
   * @param {*} ctx egg ctx
   */
  getHttpParams(ctx) {
    if (!ctx) {
      throw new ParameterException('Missing ctx parameter', 999, 500);
    }
    return {
      query: ctx.query,
      body: ctx.request.body,
      params: ctx.params,
      header: ctx.header,
    };
  }

  findParam(key) {
    for (const [ , v ] of Object.entries(this.data)) {
      if (v[key]) {
        return {
          value: v[key],
        };
      }
    }
    return {
      value: null,
    };
  }

  // todo
  getValue(types = 'verify') {
    // 返回所有参数 || 还是只返回检验的参数
    if (typeof types === 'string') types = [ types ];
    if (Array.isArray(types)) {
      // types ["query", "body", "params", "header"]
      const values = {};
      types.forEach(key => {
        Object.assign(values, this.parsed[key]);
      });
      return { ...values, ...this.verifyValues };
    }
    return this.verifyValues; // 处理过的参数, 类型转换，加默认值
  }
}

module.exports = {
  Validator,
};
