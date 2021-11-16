
<div style="text-align: center; height: 420px; position:relative; ">
  <img src="./sardine.jpeg" style="border-radius: 10px; filter: blur(1px)"/>
  <main style="text-align: center; position: absolute; top: 80px; width: 100%; z-index: 9">
    <h1 style="color: white; font-size: 80px">Sardine</h1>
  </main>
</div>

<p style="text-align: center; margin-top: 10px">
  <img src="https://img.shields.io/travis/com/pregalaxyer/sardine" />
  <img src="https://img.shields.io/codecov/c/github/pregalaxyer/sardine" />
</p>



`Sardine` is one step mock tool,  via `swagger v2`, `chance`, `koa`. It will check `request` and return `response`. You can set swagger `format` property with chance method name to fake different types data~


### Install

``` bash
npm install @pregalaxyer/sardine -D
//or
yarn add @pregalaxyer/sardine -D

```

### Usage

```js
// mock.js
const {
  default: Sardine,
  chanceInstance,
  responseBodyMiddleware // a middleware Examples
} = require('@pregalaxyer/sardine')

new Sardine({
  url: 'https://petstore.swagger.io/v2/swagger.json',
  port: 9000,
  responseMiddleWares: [
    // sardine will fake the code & msg field in body with provide value
    // { code: '0', 'msg': 'success', ...other fake data} 
    responseBodyMiddleware([
      { key: 'code', value: '0' },
      { key: 'msg', value: 'success' }
    ])
  ]
})

```
Run `node mock.js` to start your first sardine mock server

`Options`:
``` typescript
interface SardineOptions {
  url: string
  port?: number
  requestMiddlewares?: Middleware[]
  responseMiddleWares?: Middleware[]
}
/* make it is possible to config your chanceInstance
  */
public chanceInstance: {
  /**
   * config chance fake count of arrays
   */
  __DEFAULT_ARRAY_COUNT?: number
  /**
   * max stack size for nest object
   */
  _MAX_NEST_STACK_SIZE?: number
} = chanceInstance

```
- `url` swagger json url
- `port` mock sever port
- `requestMiddlewares` & `responseMiddleWares` middleware use in koa mock server, [more about koa](https://koajs.com/)



### Swagger Schemes

 📖 : [Swagger Schemes V2](https://swagger.io/specification/v2/#swaggerSchemes)

 💡: <b>Newton's 🍎</b>
> However, the format property is an open string-valued property, and can have any value to support documentation needs. Formats such as "email", "uuid", etc., can be used even though they are not defined by this specification


You can create a lot fake data via different format type(id, card, png, city)

🚥 : <b>Rules</b>
- `number` types use `minimum` & `maximum`

- `string` types use `maxLength`  & `minLength`

- `array` types use `maxItems` & `minItems`

- `enum` types use for `options`

- `default` value use for fake value


### TODO

- swagger v3 support
- request validtor middleware（options 😄）
