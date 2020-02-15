'use strict';

const { Rule } = require('./Rule');

function getOwnKeys(instance, params = {}) {
  const { prefix, specifiedType, filter } = params;
  const res = [];
  while (Object.getPrototypeOf(instance)) {
    // console.log(Reflect.ownKeys(instance), instance)

    const names = Reflect.ownKeys(instance).filter(name => shouldKeep(name));
    res.push(...names);

    const f = Object.getPrototypeOf(instance);

    instance = f;
  }
  return res;

  function shouldKeep(value) {
    if (filter && filter(value)) return true;
    if (prefix && value.startsWith(prefix)) return true;
    if (specifiedType && instance[value] instanceof specifiedType) return true;
    return false;
  }
}

function ownKeysFilter(key) {
  if (/validate([A-Z])\w+/g.test(key)) return true;
  if (this[key] instanceof Array) { // this => Rule.instance
    this[key].forEach(value => {
      const isRuleType = value instanceof Rule;
      if (!isRuleType) {
        throw new Error('验证数组必须全部为Rule类型');
      }
    });
    return true;
  }
  return false;
}

module.exports = {
  getOwnKeys,
  ownKeysFilter,
  test,
};

/**
 * e.g.
 * @example
 */
class A {
  constructor() {
    this.nameA = 'a';
  }
  validateA() {
    console.log('A');
  }
}

function test() {
  const a = new A();
  getOwnKeys(a, {}); // [ 'nameA', 'constructor', 'validateA' ].filter(name => _) => [ 'nameA', 'validateA']
}

