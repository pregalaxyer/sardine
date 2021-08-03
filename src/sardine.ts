import Koa, { Middleware } from 'koa'
import { getSwaggerJsonFromUrl, SwaggerPathInParameters } from './share'
import { initKoa } from './server'
import { KOA_PORT } from './server/config'
export { responseBodyMiddleware } from './server/middleware/response'
const Chance = require('chance')

const chanceInstance: InstanceType<any> = new Chance()
export { chanceInstance }

interface SardineOptions {
  url: string
  port?: number
  requestMiddlewares?: Middleware[]
  responseMiddleWares?: Middleware[]
}

export default class Sardine {
  /**
   * make it is possible to config your chanceInstance
   */
  public chanceInstance: {
    /**
     * config chance fake count of arrays
     */
    __DEFAULT_ARRAY_COUNT?: number
    /**
     * max stack size for nest object
     */
    _MAX_NEST_STACK_SIZE?: number
  } = chanceInstance
  public koa: Koa | undefined
  public swagger: SwaggerPathInParameters | undefined
  public url: SardineOptions['url']
  public port?: number
  public requestMiddlewares?: Middleware[]
  public responseMiddleWares?: Middleware[]
  constructor(options: SardineOptions) {
    this.url = options.url
    this.port = options.port || KOA_PORT
    this.requestMiddlewares = options.requestMiddlewares
    this.responseMiddleWares = options.responseMiddleWares
    this.init()
  }

  /**
   * get swagger json and create koa server
   */
  init = async () => {
    this.swagger = await getSwaggerJsonFromUrl(this.url)
    this.koa = initKoa(this.swagger, this.requestMiddlewares)
    if (this.responseMiddleWares && this.responseMiddleWares) {
      this.responseMiddleWares.forEach(middleware => {
        console.log(middleware)
        this.koa?.use(middleware)
      })
    }
    const schemes = this.swagger.schemes ? this.swagger.schemes[0] : 'http'
    const fullScheme = schemes.endsWith('://') ? schemes : schemes + '://'
    console.log(
      '✨ fake server is start on: http://localhost:' + this.port + '\n',
      '💻 proxy target is ' + fullScheme + this.swagger.host + this.swagger.basePath
    )
    this.koa.listen(this.port)
  }
}
