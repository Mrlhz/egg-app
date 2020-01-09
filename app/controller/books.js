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
      tatal: dataList.length,
    };
  }

  async search() {
    const { ctx } = this;
    let { q, start = 0, count = 20 } = ctx.query;

    console.log(ctx.query);
    start = Number.parseInt(start);
    count = Number.parseInt(count);
    const dataList = await ctx.model.Books.find({
      title: new RegExp(`/${q}/gi`),
    }, { _id: 0 }).skip(start).limit(count);

    ctx.body = {
      list: dataList,
      tatal: dataList.length,
    };
  }
}

module.exports = BooksController;
