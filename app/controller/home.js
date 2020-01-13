'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
      books: 'http://localhost:5000/books?start=0',
    };
  }

  async see() {
    const { ctx } = this;
    ctx.body = this;
  }

  async ua() {
    this.ctx.body = `isIOS: ${this.ctx.isIOS}`;
  }

  async goods() {
    const result = await this.ctx.curl('https://api.myjson.com/bins/74l63', {
      dataType: 'json',
    });
    this.ctx.body = {
      data: result.data,
    };
  }
}

module.exports = HomeController;
