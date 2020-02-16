'use strict';

// app/controller/books.js
const Controller = require('egg').Controller;
const { SearchValidator } = require('../../validators/books');

class SearchController extends Controller {
  async queryData(ctx) {
    const rule = new SearchValidator(ctx);
    const { q, start = 0, count = 20 } = await ctx.validate(rule, [ 'body', 'query' ]);
    let dataList = [];
    let total = 0;
    if (ctx.isISBN(q)) {
      const param = { isbn: Number.parseInt(q) };
      dataList = await ctx.model.Books.find(param, { _id: 0 });
      total = await ctx.model.Books.countDocuments(param);
    } else {
      const queryParam = q ? { title: new RegExp(`${q}`, 'i') } : {};
      dataList = await ctx.model.Books.find(queryParam, { _id: 0 }).skip(start).limit(count);
      total = await ctx.model.Books.countDocuments(queryParam);
    }

    return {
      dataList,
      count: dataList.length < count ? dataList.length : count, // 每次实际查询到的count 可以参考豆瓣
      total,
      q,
    };
  }

  async search() {
    const { ctx } = this;
    const data = await this.queryData(ctx);
    await ctx.render('books/index.ejs', data);
  }

  // for api
  async searchBooks() {
    const { ctx } = this;
    ctx.body = await this.queryData(ctx);
  }
}

module.exports = SearchController;
