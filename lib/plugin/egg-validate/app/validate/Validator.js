'use strict';

const { cloneDeep } = require('lodash');
const { FindProperty, FindPropertyFilter } = require('./util');
const { ParameterException } = require('./HttpException');
const { RuleResult, RuleField } = require('./Rule');

class Validator {
  constructor(rule, ctx, params) {
    this.rule = rule;
    this.ctx = ctx;
    this.params = params;

    this.data = {};
    this.parsed = {};
  }

  async validate() {
    const params = this.getHttpParams(this.ctx);
    this.data = cloneDeep(params);
    this.parsed = cloneDeep(params);

    const memberKeys = FindProperty(this.rule, {
      filter: FindPropertyFilter.bind(this.rule),
    });

    console.log(memberKeys);

    const errorMsgs = [];
    for (const key of memberKeys) {
      const result = await this.check(key);
      if (!result.success) {
        errorMsgs.push(result.msg);
      }
    }
    if (errorMsgs.length !== 0) {
      throw new ParameterException(errorMsgs); // [ msg ]
    }
    return this;
  }

  async check(key) {
    const isFunction = typeof (this.rule[key]) === 'function';
    let result;
    if (isFunction) {
      try {
        await this.rule[key](this.data);
        result = new RuleResult(true);
      } catch (e) {
        result = new RuleResult(false, e.msg || e.message || '参数错误');
      }
    } else {
      const rules = this.rule[key];
      console.log(13, key, rules);
      const ruleField = new RuleField(rules);

      const param = this.findParam(key);
      result = ruleField.validate(param.value);
    }

    if (!result.pass) {
      const msg = `${isFunction ? '' : key}${result.msg}`;
      return {
        msg,
        success: false,
      };
    }
    return {
      msg: 'ok',
      success: true,
    };
  }

  /**
   * @see https://eggjs.org/zh-cn/basics/controller.html#获取-http-请求参数
   * @param {*} ctx egg ctx
   */
  getHttpParams(ctx) {
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

  getValue() {

  }
}

module.exports = {
  Validator,
};
