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
    const data = await this._index(ctx);
    await ctx.render('books/index.ejs', data);
  }

  async getBooks() {
    const { ctx } = this;
    ctx.body = await this._index(ctx);
  }

  async search() {
    const { ctx } = this;
    const data = await this._search(ctx);
    await ctx.render('books/index.ejs', data);
  }

  async searchBooks() {
    const { ctx } = this;
    ctx.body = await this._search(ctx);
  }

  async _search(ctx) {
    console.log(ctx.query, ctx.request.body);
    let q = ctx.request.body.q;
    q = q ? q : ctx.query.q;
    let { start = 0, count = 20 } = ctx.query;

    start = Number.parseInt(start);
    count = Number.parseInt(count);

    const dataList = await this.query(ctx, { q });
    return {
      dataList: dataList.slice(start, start + count),
      total: dataList.length,
      q,
    };
  }

  async detail() {
    const { ctx } = this;
    const item = await this._detail(ctx);
    await ctx.render('books/book_detail.ejs', {
      item,
    });
  }

  async getBookDetail() {
    const { ctx } = this;
    ctx.body = await this._detail();
  }

  async _detail() {
    const { ctx } = this;
    const { isbn } = ctx.params;
    console.log(ctx.params);
    return await ctx.model.Books.findOne({
      isbn: Number.parseInt(isbn),
    }, { _id: 0 });
  }

  async _index(ctx) {
    // const { ctx } = this;
    let { start = 0, count = 20 } = ctx.query;
    console.info(ctx.query);
    count = Number.parseInt(count);
    const dataList = await this.query(ctx, { start });

    return {
      dataList: dataList.slice(0, count),
      q: '默认显示',
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
