'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const { Schema, model } = mongoose;

  const bookSchema = new Schema({
    author: {
      type: [ String ], // 作者
    },
    binding: { // 装帧
      type: String,
      default: '',
    },
    category: [ String ], // tag分类
    id: Number,
    url: String,
    image: String,
    images: {
      type: {
        large: String,
      },
    },
    isbn: Number,
    pages: Number, // 页数
    price: {
      type: String,
      default: '',
    }, // 定价
    pubdate: String, // 出版年
    series: {
      type: String,
      default: '',
    }, // 丛书
    publisher: { // 出版社
      type: String,
      default: '',
    },
    producer: { // 出品方
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    }, // 副标题
    summary: String, // 内容简介
    title: String,
    original: {
      type: String,
      default: '',
    },
    translator: {
      type: [{
        type: String,
      }],
    },
    rating: String, // 评分
    rating_people: String, // 评价人数
  });

  return model('Books', bookSchema);
};
