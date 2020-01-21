'use strict';

// app/controller/books.js
const Controller = require('egg').Controller;

class BooksController extends Controller {
  async query(ctx, params = {}) {
    let { q, start = 0 } = params;
    start = Number.parseInt(start);
    let dataList = null;
    if (ctx.isISBN(q)) {
      dataList = await ctx.model.Books.find({
        isbn: Number.parseInt(q),
      }, { _id: 0 });
    } else {
      const queryParam = q ? { title: new RegExp(`${q}`, 'i') } : {};
      dataList = await ctx.model.Books.find(queryParam, { _id: 0 }).skip(start);
    }

    return dataList;
  }

  async index() {
    const { ctx } = this;
    let { start = 0, count = 20 } = ctx.query;
    console.info(ctx.query);
    // todo
    start = Number.parseInt(start);
    count = Number.parseInt(count);
    const dataList = await this.query(ctx, { start });

    await ctx.render('books/index.ejs', {
      dataList: dataList.slice(0, count),
      q: '默认显示',
      total: dataList.length,
    });
  }

  async search() {
    const { ctx } = this;
    console.log(ctx.request.body, ctx.query);
    const { q } = ctx.request.body;

    const dataList = await this.query(ctx, { q });
    await ctx.render('books/index.ejs', {
      dataList,
      total: dataList.length,
      q,
    });
  }

  async detail() {
    const { ctx } = this;
    const { isbn } = ctx.params;
    const item = await ctx.model.Books.findOne({
      isbn: Number.parseInt(isbn),
    }, { _id: 0 });
    await ctx.render('books/book_detail.ejs', {
      item,
    });
  }

  async _index() {
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
      start,
      total: dataList.length,
    };
  }

  async _isbn() {
    const { ctx } = this;
    let isbn = ctx.params.isbn;

    if (ctx.isISBN(isbn)) {
      isbn = Number.parseInt(isbn);
      const dataList = await ctx.model.Books.findOne({
        isbn,
      }, { _id: 0 });
      ctx.body = dataList || {};
    } else {
      ctx.body = { msg: 'isbn值不合法' };
    }
  }

}

module.exports = BooksController;
