'use strict';

const bcrypt = require('bcryptjs');

module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema, model } = mongoose;

  const UserSchema = new Schema({
    nickname: String,
    email: {
      type: String,
      unique: true,
      validate: {
        validator(val) {
          return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val);
        },
        message: '{VALUE} is not a valid email string!',
      },
    },
    password: {
      type: String,
      set(val) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(val, salt);
      },
    },
    openid: {
      type: String,
      unique: true,
    },
  });

  return model('User', UserSchema);
};
