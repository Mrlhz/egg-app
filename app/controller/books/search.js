'use strict';

// app/controller/books.js
const Controller = require('egg').Controller;

class SearchController extends Controller {
  async queryData(ctx) {
    console.log('search', ctx.query, ctx.request.body);
    let { start = 0, count = 20 } = ctx.query; // for api
    let q = ctx.request.body.q; // 输入框
    q = q ? q : ctx.query.q; // if true for api
    q = q ? q.trim() : null;
    start = Number.parseInt(start);
    count = Number.parseInt(count);

    let dataList = null;
    if (ctx.isISBN(q)) {
      dataList = await ctx.model.Books.find({
        isbn: Number.parseInt(q),
      }, { _id: 0 });
    } else {
      const queryParam = q ? { title: new RegExp(`${q}`, 'i') } : {};
      dataList = await ctx.model.Books.find(queryParam, { _id: 0 }).skip(start);
    }
    return {
      dataList: dataList.slice(start, start + count),
      total: dataList.length,
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
