'use strict';

/**
 * @description 用户注册验证
 * @class RegisterValidator
 */
class RegisterValidator {
  constructor(ctx) {
    this.email = [
      new ctx.Rule('isEmail', '不符合Email规范'),
    ];

    this.password = [
      // 用户指定范围 123456 $^
      new ctx.Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32,
      }),
      new ctx.Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]'),
    ];

    this.password2 = this.password;

    this.nickname = [
      new ctx.Rule('isLength', '昵称不符合长度规范', {
        min: 4,
        max: 32,
      }),
    ];
  }

  validatePassword(vals) {
    const psw1 = vals.body.password;
    const psw2 = vals.body.password2;
    if (psw1 !== psw2) {
      throw new Error('两个密码必须相同');
    }
  }

  async validateEmail(vals) {
    const email = vals.body.email;
    const user = await this.ctx.modle.User.findOne({ email });
    if (user) {
      throw new Error('email已存在');
    }
  }

}

module.exports = {
  RegisterValidator,
};
