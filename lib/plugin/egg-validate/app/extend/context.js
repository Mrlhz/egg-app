'use strict';

// app/extend/context.js

const { Validator } = require('../validate/Validator');
const { Rule } = require('../validate/Rule');

module.exports = {
/**
 * @description 参数校验
 * @param {*} rule 验证规则、rule.ctx => Egg.Context 和 验证所需参数（egg.query, egg.body）
 * @param {*} params 其他参数 e.g. 返回的参数类型
 * @todo rule.ctx 有ctx 是否需要传ctx
 */
  async validate(rule = {}, params) {
    return await new Validator(rule, params).validate();
  },
  Rule,
};

// 1. extends Validator => _Valdator
// 2. new _Valdator() => rule
