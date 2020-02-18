'use strict';

// app/controller/books.js
const Controller = require('egg').Controller;
const { RegisterValidator } = require('../../validators/user');

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const rule = new RegisterValidator(ctx);
    const verifyParam = await ctx.validate(rule, 'body'); // { nickname, email, password, openid }
    const { nickname, email } = await new ctx.model.User(verifyParam).save();
    // todo
    ctx.body = ctx.flash({
      msg: 'register success',
      status: 200,
    }, { nickname, email });
  }
}

module.exports = UserController;
