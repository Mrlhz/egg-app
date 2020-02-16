'use strict';

class SearchValidator {
  constructor(ctx) {
    this.ctx = ctx;
    this.q = [
      // new ctx.Rule('isLength', '搜索关键词不符合规范', {
      //   min: 0, // 搜索关键词不能为空 ?
      //   max: 16,
      // }),
      // 匹配中文、英文、数字、空白字符
      new ctx.Rule('matches', '搜索关键词不符合规范', '^[\u4E00-\u9FA5A-Za-z0-9\s]+$'),
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
