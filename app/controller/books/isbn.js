'use strict';

// app/controller/books.js
const Controller = require('egg').Controller;

class ISBNController extends Controller {
  async isbn() {
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

module.exports = ISBNController;
