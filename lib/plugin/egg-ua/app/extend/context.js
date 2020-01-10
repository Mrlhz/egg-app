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

    if (length === 13 && typeof Number.parseInt(word) === 'number') {
      return true;
    }
  },
};
