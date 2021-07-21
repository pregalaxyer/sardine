import Koa from 'koa'
import fakeResponseMiddleWare from './middleware/response'
import { Swagger } from '../swagger'
const cors = require('@koa/cors')

export function initKoa(swagger: Swagger): Koa {
  const app = new Koa()
  /**
   * https://github.com/koajs/cors
   */
  app.use(cors({ credentials: true }))
  app.use(fakeResponseMiddleWare(swagger))
  return app
}
