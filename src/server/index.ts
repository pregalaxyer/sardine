import Koa, { Middleware } from 'koa'
import fakeResponseMiddleWare from './middleware/response'
import { Swagger } from '../swagger'
const cors = require('@koa/cors')

export function initKoa(swagger: Swagger, requestMiddlewares?: Middleware[]): Koa {
  const app = new Koa()
  /**
   * https://github.com/koajs/cors
   */
  app.use(cors({ credentials: true }))
  if (requestMiddlewares && requestMiddlewares.length) {
    requestMiddlewares.forEach(middleware => {
      app.use(middleware)
    })
  }
  app.use(fakeResponseMiddleWare(swagger))
  return app
}
