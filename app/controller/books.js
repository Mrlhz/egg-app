'use strict';

// app/controller/books.js
const Controller = require('egg').Controller;

class BooksController extends Controller {
  async index() {
    const { ctx } = this;
    let { start = 0, count = 20 } = ctx.query;
    console.info(ctx.query);
    // todo
    start = Number.parseInt(start);
    count = Number.parseInt(count);
    const dataList = await ctx.model.Books.find({
      // category: [ '编程' ],
    }, { _id: 0 }).skip(start).limit(count);

    ctx.body = {
      list: dataList,
      total: dataList.length,
    };
  }

  async search() {
    const { ctx } = this;
    let { q, start = 0, count = 20 } = ctx.query;

    console.log(ctx.query);
    start = Number.parseInt(start);
    count = Number.parseInt(count);
    const dataList = await ctx.model.Books.find({
      title: new RegExp(`${q}`, 'i'),
    }, { _id: 0 }).skip(start).limit(count);

    ctx.body = {
      list: dataList,
      total: dataList.length,
    };
  }

  async _isbn() {
    const { ctx } = this;
    let isbn = ctx.params.isbn;

    if (ctx.isISBN(isbn)) {
      isbn = Number.parseInt(isbn);
      const dataList = await ctx.model.Books.findOne({ isbn }, { _id: 0 });
      ctx.body = dataList || {};
    } else {
      ctx.body = { msg: 'isbn值不合法' };
    }
  }

  async getBookTags() {
    const { ctx } = this;
    const { q } = ctx.query;

    const query = q ? { tag: new RegExp(q, 'i') } : {};
    let dataList = await ctx.model.BookTags.find(query, { _id: 0 });
    dataList = dataList.map(item => item.tag);
    ctx.body = {
      list: dataList,
      total: dataList.length,
    };
  }

}

module.exports = BooksController;
