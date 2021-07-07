import nock from 'nock/types'
const Nock = require('nock')
import { Swagger } from '../swagger'
type Schemes = 'http' | 'https' | 'ws' | 'wss'

export function initNock(swagger: Swagger): nock.Scope {
  // @ts-ignore
  const schemes: Schemes = swagger.schemes ? swagger.schemes[0] : 'http'
  const basePath: string = schemes + '://' + swagger.host + swagger.basePath
  return Nock(basePath)
}
