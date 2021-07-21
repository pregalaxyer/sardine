
<div style="text-align: center; height: 420px; position:relative; ">
  <img src="./sardine.jpeg" style="border-radius: 10px; filter: blur(1px)"/>
  <main style="text-align: center; position: absolute; top: 80px; width: 100%; z-index: 9">
    <h1 style="color: white; font-size: 80px">Sardine</h1>
  </main>
</div>

<p style="text-align: center; margin-top: 10px">
  <img src="https://img.shields.io/travis/com/diveDylan/sardine" />
  <img src="https://img.shields.io/codecov/c/github/diveDylan/sardine" />
</p>



`Sardine` is a fake serve tool via `swagger`, `chance`, `koa`. It will check `request` and return `response`. You can set swagger `format` property with chance method name to fake different types data~


### Install

``` bash
npm install sardine -D
//or
yarn add sardine -D

```

### Usage

```js
const Sardine = require('sardine')

new Sardine({
  url: 'https://petstore.swagger.io/v2/swagger.json',
  port: 9000
})

```

`Options`:
``` typescript
interface SardineOptions {
  url: string
  port?: number
  defaultFakeConfigs?: Record<string, any>
  koaMiddleware?: Middleware
}


```
- `url` swagger json url
- `port` mock sever port
- `defaultFakeConfigs` TODO
- `koaMiddleware` middleware use in koa mock server




### Swagger Schemes

 📖 : [Swagger Schemes](https://swagger.io/specification/v2/#swaggerSchemes)

 💡: <b>Newton's 🍎</b>
> However, the format property is an open string-valued property, and can have any value to support documentation needs. Formats such as "email", "uuid", etc., can be used even though they are not defined by this specification

🚥 : <b>Rules</b>
- `number` types use `minimum` & `maximum`

- `string` types use `maxLength`  & `minLength`

- `array` types use `maxItems` & `minItems`

- `enum` types use for `options`

- `default` value use for fake value














