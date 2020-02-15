'use strict';

class SearchValidator {
  constructor(ctx) {
    this.ctx = ctx;
    this.q = [
      // new ctx.Rule('isLength', '搜索关键词不能为空', {
      //   min: 1,
      //   max: 16,
      // }),
      new ctx.Rule('isOptional', '', ''),
    ];

    this.start = [
      // 需要是正整数
      new ctx.Rule('isInt', '不符合规范', {
        min: 0,
        max: 70000,
      }),
      new ctx.Rule('isOptional', '', 0),
    ];

    this.count = [
      new ctx.Rule('isInt', '不符合规范', {
        min: 1,
        max: 100,
      }),
      new ctx.Rule('isOptional', '', 20),
    ];
  }
}

module.exports = {
  SearchValidator,
};
