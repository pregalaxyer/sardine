import fetch from 'node-fetch'
import { Swagger } from './swagger.d'

/**
 * swagger parameters in path handler
 */
export interface SwaggerPathInParameters extends Swagger {
  regPaths?: RegExp[]
  regPathMap?: Map<RegExp, string>
}

export async function getSwaggerJsonFromUrl(url: string): Promise<SwaggerPathInParameters> {
  const data: SwaggerPathInParameters = await fetch(url).then((res: { json: () => any }) =>
    res.json()
  )
  data.regPaths = Object.keys(data.paths)
    .filter(key => /\{\w+\}/.test(key))
    .map(key => {
      if (!data.regPathMap) data.regPathMap = new Map<RegExp, string>()
      const reg = new RegExp(key.replace(/\{\w+\}/, '\\d+'))
      data.regPathMap.set(reg, key)
      return reg
    })
  return data
}
/**
 * title => used for
 * the mock server for ${title} application is runing at http://locahost:9999
 */
export function getServerName(swagger: Swagger): string {
  return swagger.info.title as string
}

export const objectTag: string = '[object Object]'
export const toString: Function = (val: any) => Object.prototype.toString.call(val)
/**
 * @description value is object only, exclude Date, Reg, Array, Null
 */
export function isObject(value?: any): value is object {
  return toString(value) === objectTag
}

export function isString(value: any): value is string {
  return typeof value === 'string'
}
