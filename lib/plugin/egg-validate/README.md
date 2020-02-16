## 验证器

- [校验器](http://doc.cms.7yue.pro/lin/server/koa/validator.html#类校验)
- [egg-validate](https://www.npmjs.com/package/egg-validate)
- [parameter](https://github.com/node-modules/parameter)
- [validator](https://github.com/validatorjs/validator.js)
- []()
- []()
- []()
- []()

类型 | 验证方法
---|---
number | 
int | isInt
integer | isInt
float | isFloat
string | isLength(str, {min:0, max: undefined})
id | `/^\d+$/`
date | isISO8601(str) https://github.com/validatorjs/validator.js/blob/master/test/validators.js#L6675
date | `/^\d{4}\-\d{2}\-\d{2}$/`
dateTime | `/^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/`
boolean | isBoolean
array | 
object | 
json | isJSON
enum | 
email | isEmail
password | ``` /^[\w\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\|\;\:\'\"\,\<\.\>\/\?]+$/ ```
url | isURL
jwt | isJWT(str)	check if the string is valid JWT token.


### 调用顺序

```js
new Rule() => rules // 实例

new Validator(rules, params).validate()

new Valiator() 初始化参数

获取ruleOwnKeys，遍历验证rules

if rule : Funtion => 调用函数
else rule : field => 在Rule -> ruleField.validate(param.value) -> new Rule().validate()

```


### todo

- [x] 参数为string时是否需要主动trim();
- [ ] 验证传入的rule类型