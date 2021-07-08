import nock from 'nock/types'
import { Swagger } from './swagger'

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
