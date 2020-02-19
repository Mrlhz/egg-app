

- [eggjs examples](https://github.com/eggjs/examples)
- [egg-cnode](https://github.com/cnodejs/egg-cnode)

- [egg-mongoose](https://www.npmjs.com/package/egg-mongoose)
- [Queries 查询](http://www.mongoosejs.net/docs/queries.html)
- [nunjucks](https://mozilla.github.io/nunjucks/)
- [ejs](https://github.com/mde/ejs) https://ejs.co/

https://github.com/SunShinewyf/issue-blog

https://www.mozilla.org/zh-CN/firefox/73.0a2/firstrun/


### 路由--参数命名

```js
let url = 'http://localhost:5000/isbn/978-7208246-'

let isbn = ctx.params.isbn
// isbn = '978'
```


### 有的书有统一书号,有的书有ISBN?

```
没有isbn
https://book.douban.com/subject/1857131/

```
 fulibl.net或fulibl.com或fulibl.cc

ejs
https://github.com/mde/ejs/tree/master/examples

- [调用豆瓣API加载图片报403](https://www.jianshu.com/p/7b098a5a9b46)


- [Egg.js_POST 提交表单时的 CSRF 安全验证](https://www.jianshu.com/p/0ec1bcff0ecd)


### 登陆注册

- 密码加密 彩虹攻击

https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/models-definition.md#getters--setters


http://www.mongoosejs.net/docs/api.html#schematype_SchemaType-set
- [mongoose schema层加解密（getters setters](https://www.jianshu.com/p/5150c78a8731)

参考
https://github.com/cnodejs/egg-cnode
https://github.com/shinygang/Vue-cnodejs
https://github.com/icxcat/egg-RESTfulAPI
https://github.com/cnodejs/nodeclub

https://blog.csdn.net/duola8789/article/details/89853779


### 参数校验

https://www.npmjs.com/package/egg-validate
http://doc.cms.7yue.pro/lin/server/koa/validator.html

- HttpException e.msg  Error e.message


1. 写成插件

```
{
	"nickname": "lhzs",
	"email": "1@qq.com",
	"password": "123456@",
	"password2": "123456@",
  "openid": "123456d"
}
```

### bug

- [mongodb出现E11000 duplicate key error collection](https://blog.csdn.net/Xiongtm/article/details/77650448?locationNum=6&fps=1)

```js
mongoose中的Schema设置unique不生效问题

E11000 duplicate key error collection: douban.users index: openid_1 dup key: { openid: null }
```

### 

- [Mongoose解决MongoDB弃用警告（DeprecationWarning）](https://blog.csdn.net/qq_42760049/article/details/98593923)


```js
'use strict';

/**
 * @see https://eggjs.org/zh-cn/basics/app-start.html
 */
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务

  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
  }

  async didReady() {
    // 应用已经启动完毕
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
  }
}

module.exports = AppBootHook;
```
