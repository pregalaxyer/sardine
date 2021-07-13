import { Swagger } from './swagger'

interface SardineOptions {
  url: string
  defaultFakeConfigs?: Record<string, any>
  // TODO: nock config
}
export class Sardine {
  public swagger: Swagger | undefined
  constructor(options: SardineOptions) {}
}
