'use strict';

// app/controller/books.js
const Controller = require('egg').Controller;

class BookDetailsController extends Controller {
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
}

module.exports = BookDetailsController;
