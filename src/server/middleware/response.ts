import { Middleware } from 'koa'
import { fakeResponse } from '../../fake'
import { FakeResponseData, DEFAULT_RESPONSE_DATA, DEFAULT_RESPONSE } from '../config'
import { SwaggerResponses } from '../../swagger'
import { SwaggerPathInParameters, isObject } from '../../share'

const fakeResponseMiddleWare: (swagger: SwaggerPathInParameters) => Middleware = swagger => async (
  ctx,
  next
) => {
  const { path, method } = ctx.request
  const responses = getSwaggerPathResponse(swagger, path, method)
  const { status, body } = handlerResponse(responses, swagger)
  ctx.body = body
  ctx.status = status
  console.log(
    'fake response success by sardine🐟 : ' +
      `
    {
      method: ${method},
      path: ${path}
    }
  `
  )
  await next()
}

export function getSwaggerPathResponse(
  swagger: SwaggerPathInParameters,
  path: string,
  method: string
) {
  const lowCaseMethod = method.toLowerCase()
  if (swagger.paths[path]) return swagger.paths[path][lowCaseMethod].responses
  const reg: undefined | RegExp = swagger.regPaths?.filter(reg => reg.test(path))[0]
  return reg
    ? swagger.paths[swagger.regPathMap?.get(reg) as string][lowCaseMethod].responses ||
        DEFAULT_RESPONSE
    : DEFAULT_RESPONSE
}

export function handlerResponse(
  responses: SwaggerResponses,
  swagger: SwaggerPathInParameters
): FakeResponseData {
  const statusOk = responses?.[200]
  if (statusOk) {
    return {
      status: 200,
      body: fakeResponse(statusOk, swagger.definitions)
    }
  } else {
    const codeList: string[] = Object.keys(responses)
    const code = codeList[0]
    if (codeList.length) {
      return {
        status: /\d+/.test(code) ? Number(code) : 200,
        body: responses[codeList[0]]?.description
      }
    } else {
      return DEFAULT_RESPONSE_DATA
    }
  }
}

export interface ResponseBodyMiddlewareOptions {
  key: string
  value: any
}
function responseBodyHandler(body: Record<string, any>, options: ResponseBodyMiddlewareOptions[]) {
  if (!isObject(body)) body = {}
  options.forEach(option => {
    const { key, value } = option
    // @ts-ignore
    body[key] = value
  })
  return body
}
/**
 * fake a responseBody fill some keys in fakeResponse with specify values
 * { [key]: value}
 */
export const responseBodyMiddleware: (
  options: ResponseBodyMiddlewareOptions[]
) => Middleware = options => async (ctx, next) => {
  if (!options || !options.length) {
    await next()
    return
  }
  if (Array.isArray(ctx.body)) {
    ctx.body = ctx.body.map(bodyItem => responseBodyHandler(bodyItem, options))
  } else {
    ctx.body = responseBodyHandler(ctx.body, options)
  }
  await next()
}

export default fakeResponseMiddleWare
