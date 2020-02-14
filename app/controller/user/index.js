'use strict';

// app/controller/books.js
const Controller = require('egg').Controller;
const { RegisterValidator } = require('../../validators/user');

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const rule = new RegisterValidator(ctx);
    const userInfo = await ctx.validate(rule, ctx); // { nickname, email, password, openid }
  //   console.log(userInfo);
  //   const msg = await this.validateEmail(userInfo.email);
  //   if (msg) {
  //     // throw new Error('email已存在');
  //     ctx.body = { msg: 'email已存在' };
  //   } else {
  //     try {
  //       const res = await new ctx.model.User(userInfo).save();
  //       ctx.body = {
  //         msg: 'register success',
  //         userInfo,
  //         res,
  //       };
  //     } catch (e) {
  //       // throw error;
  //       console.error(1, e);
  //     }
  //   }
  // }
  }
}

module.exports = UserController;
