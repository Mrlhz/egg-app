'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getBookTags() {
    const { ctx } = this;
    const { q, all = false } = ctx.query;

    const query = q ? { tag: new RegExp(q, 'i') } : {};
    let dataList = await ctx.model.BookTags.find(query, { _id: 0 });
    dataList = all ? dataList : dataList.map(item => item.tag);
    ctx.body = {
      list: dataList,
      total: dataList.length,
    };
  }
}

module.exports = HomeController;
