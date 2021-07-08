import nock from 'nock/types'
import { Swagger } from './swagger'

interface SwaggerNockOptions {
  path: string
  body?: string | Buffer | Record<string, any> | RegExp | Function
  code: number
  method: 'post' | 'get' | 'delete' | 'put' | 'head'
  response: any
}

interface SardineOptions {
  url: string
  defaultFakeConfigs?: Record<string, any>
  // TODO: nock config
}
export class Sardine {
  public scope: nock.Scope | undefined
  public swagger: Swagger | undefined
  constructor(options: SardineOptions) {}
}
