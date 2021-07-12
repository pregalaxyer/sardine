import nock from 'nock/types'
import Koa from 'koa'
import { KOA_HOST } from './config'
const Nock = require('nock')
import fakeResponseMiddleWare from './middleware/response'
import { Swagger } from '../swagger'
type Schemes = 'http' | 'https' | 'ws' | 'wss'

export function initNock(swagger: Swagger): nock.Scope {
  // @ts-ignore
  const schemes: Schemes = swagger.schemes ? swagger.schemes[0] : 'http'
  const basePath: string = schemes + '://' + swagger.host + swagger.basePath
  // https://github.com/nock/nock#default-reply-headers
  return Nock(basePath).defaultReplyHeaders({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': swagger.host
  })
}

export function initKoa(swagger: Swagger): Koa {
  const app = new Koa()

  app.use(fakeResponseMiddleWare(swagger))

  app.listen(KOA_HOST)
  console.log('fake server is start on: http://localhost:' + KOA_HOST)
  return app
}
