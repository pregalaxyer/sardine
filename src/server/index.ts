import Koa from 'koa'
import { KOA_PORT } from './config'
import fakeResponseMiddleWare from './middleware/response'
import { Swagger } from '../swagger'
const cors = require('@koa/cors')

export async function initKoa(swagger: Swagger): Promise<Koa> {
  const app = new Koa()
  /**
   * https://github.com/koajs/cors
   */
  app.use(cors({ credentials: true }))
  app.use(fakeResponseMiddleWare(swagger))

  return app
}
