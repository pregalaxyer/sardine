import Koa from 'koa'
import { KOA_HOST } from './config'
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

  app.listen(KOA_HOST)
  const schemes = swagger.schemes ? swagger.schemes[0] : 'http'
  const fullScheme = schemes.endsWith('://') ? schemes : schemes + '://'
  console.log(
    '✨ fake server is start on: http://localhost:' + KOA_HOST + '\n',
    '💻 proxy target is ' + fullScheme + swagger.host + swagger.basePath
  )
  return app
}
