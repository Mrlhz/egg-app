'use strict';

// app/controller/books.js
const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const info = ctx.request.body;

    ctx.validate({
      nickname: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      openid: { type: 'string' },
    });
    console.log(info);
    const msg = await this.validateEmail(info.email);
    if (msg) {
      // throw new Error('email已存在');
      ctx.body = { msg: 'email已存在' };
    } else {
      try {
        const res = await new ctx.model.User(info).save();
        ctx.body = {
          msg: 'register success',
          info,
          res,
        };
      } catch (e) {
        // throw error;
        console.error(1, e);
      }
    }
  }

  async validateEmail(email) {
    const { ctx } = this;
    const user = ctx.model.User.findOne({ email });
    // console.log(user);
    if (user) return user;
    return false;
  }
}

module.exports = UserController;
