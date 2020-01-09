/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1578446386782_9661';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 添加 view 配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // connection
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/douban',
      options: {
        useUnifiedTopology: true, // warn #1
      },
      // mongoose global plugins, expected a function or an array of function and options
      plugins: [],
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};