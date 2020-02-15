'use strict';

const validator = require('validator');

class RuleResult {
  constructor(pass = false, msg = '') {
    Object.assign(this, {
      pass,
      msg,
    });
  }
}

class RuleFieldResult extends RuleResult {
  constructor(pass, msg = '', legalValue = null) {
    super(pass, msg);
    this.legalValue = legalValue;
  }
  // { pass: false, msg: '', legalValue: null }
}

class Rule {
  constructor(name, msg, ...params) {
    Object.assign(this, {
      name,
      msg,
      params,
    });
  }
  validate(field) {
    if (this.name === 'isOptional') return new RuleResult(true);
    if (!validator[this.name](field + '', ...this.params)) {
      return new RuleResult(false, this.msg || this.message || '参数错误');
    }
    return new RuleResult(true, '');
  }
}

/**
 * @description 验证字段
 */
class RuleField {
  constructor(rules) {
    this.rules = rules; // [ Rule {}, Rule {} ]
  }

  validate(field) {
    if (field == null) {
      // 如果字段为空
      const allowEmpty = this.allowEmpty();
      const defaultValue = this.hasDefault();
      if (allowEmpty) {
        return new RuleFieldResult(true, '', defaultValue);
      }
      return new RuleFieldResult(false, '字段是必填参数');
    }

    for (const rule of this.rules) {
      const result = rule.validate(field);
      if (!result.pass) {
        // 一旦一条校验规则不通过，则立即终止这个字段的验证
        return new RuleFieldResult(false, result.msg, null);
      }
    }
    return new RuleFieldResult(true, '', this.convert(field));
  }

  convert(value) {
    for (const rule of this.rules) {
      if (rule.name === 'isInt') {
        return parseInt(value);
      }
      if (rule.name === 'isFloat') {
        return parseFloat(value);
      }
      if (rule.name === 'isBoolean') {
        return !!value;
      }
    }
    return value;
  }

  allowEmpty() {
    for (const rule of this.rules) {
      if (rule.name === 'isOptional') {
        return true;
      }
    }
    return false;
  }

  hasDefault() {
    for (const rule of this.rules) {
      const defaultValue = rule.params[0];
      if (rule.name === 'isOptional') {
        return defaultValue;
      }
    }
  }
}

module.exports = {
  Rule,
  RuleResult,
  RuleField,
};
