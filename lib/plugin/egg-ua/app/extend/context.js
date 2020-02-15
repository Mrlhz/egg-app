'use strict';

// app/extend/context.js
module.exports = {
  get isIOS() {
    const iosReg = /iphone|ipad|ipod/i;
    return iosReg.test(this.get('user-agent'));
  },

  isISBN(word = '') {
    if (!word) return false;
    const length = word.length;
    word = typeof word === 'string' ? word : word.toString();
    if (length === 13 && typeof Number.parseInt(word) === 'number') {
      return true;
    }
    return false;
  },

  // 不能命名为 message
  flash(info = {}, params) {
    const { msg = '', status = 200, errorCode = 10000 } = info;
    console.log(params);
    return {
      msg,
      status,
      errorCode,
      ...params,
    };
  },

};
