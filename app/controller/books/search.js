'use strict';

// app/controller/books.js
const Controller = require('egg').Controller;
const { SearchValidator } = require('../../validators/books');

class SearchController extends Controller {
  async queryData(ctx) {
    const rule = new SearchValidator(ctx);
    const { q, start = 0, count = 20 } = await ctx.validate(rule, [ 'body', 'query' ]);
    const total = await ctx.model.Books.estimatedDocumentCount();
    let dataList = null;
    if (ctx.isISBN(q)) {
      dataList = await ctx.model.Books.find({
        isbn: Number.parseInt(q),
      }, { _id: 0 });
    } else {
      const queryParam = q ? { title: new RegExp(`${q}`, 'i') } : {};
      dataList = await ctx.model.Books.find(queryParam, { _id: 0 }).skip(start).limit(count);
    }
    return {
      dataList,
      count,
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
