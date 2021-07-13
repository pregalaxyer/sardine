import fetch from 'node-fetch'
import { Swagger } from './swagger.d'

export async function getSwaggerJsonFromUrl(url: string): Promise<Swagger> {
  const data: Swagger = await fetch(url).then((res: { json: () => any }) => res.json())
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
