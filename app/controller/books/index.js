'use strict';

// app/controller/books.js
const Controller = require('egg').Controller;

class BooksController extends Controller {
  async index() {
    const { ctx } = this;
    console.time('index time');
    const data = await this._index(ctx);
    console.timeEnd('index time');
    await ctx.render('books/index.ejs', data);
  }

  async getBooks() {
    const { ctx } = this;
    ctx.body = await this._index(ctx);
  }

  async _index(ctx) {
    // const { ctx } = this;
    console.info('index query', ctx.query);
    let { start = 0, count = 20 } = ctx.query;
    start = Number.parseInt(start);
    count = Number.parseInt(count);
    const total = await ctx.model.Books.estimatedDocumentCount(); // all documents in the collection
    // const total = await ctx.model.Books.countDocuments({ category: { $in: [ '编程' ] } }); // filter
    const dataList = await ctx.model.Books.find({}, { _id: 0 })
      .skip(start)
      .limit(count);
    return {
      dataList,
      q: '默认显示',
      start: Number.parseInt(start),
      total,
    };
  }
}

module.exports = BooksController;
