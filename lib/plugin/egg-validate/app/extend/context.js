'use strict';

// app/extend/context.js

const { Validator } = require('../validate/Validator');
const { Rule } = require('../validate/Rule');

module.exports = {
  validate(rule = [], ctx, params) {
    // console.log('myrule', rule, ctx, params);
    new Validator(rule, ctx, params).validate();
  },
  Rule,
};

// 1. extends Validator => _Valdator
// 2. new _Valdator() => rule

