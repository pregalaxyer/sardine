import { Swagger } from './swagger'
import Koa, { Middleware } from 'koa'
import { getSwaggerJsonFromUrl } from './share'
import { initKoa } from './server'

interface SardineOptions {
  url: string
  defaultFakeConfigs?: Record<string, any>
  koaMiddleware?: Middleware
  // TODO: nock config
}
export default class Sardine {
  public koa: Koa | undefined
  public swagger: Swagger | undefined
  public url: SardineOptions['url']
  public defaultFakeConfigs: SardineOptions['defaultFakeConfigs']
  public koaMiddleware: SardineOptions['koaMiddleware']

  constructor(options: SardineOptions) {
    this.url = options.url
    //TODO default fake config
    this.defaultFakeConfigs = options.defaultFakeConfigs || {}
    this.koaMiddleware = options.koaMiddleware
    this.init()
  }
  /**
   * get swagger json and create koa server
   */
  init = async () => {
    this.swagger = await getSwaggerJsonFromUrl(this.url)
    this.koa = initKoa(this.swagger)
    this.koaMiddleware && this.koa.use(this.koaMiddleware)
  }
}
