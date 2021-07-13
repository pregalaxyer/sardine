import { Middleware } from 'koa'
import { fakeResponse } from '../../fake'
import { FakeResponseData, DEFAULT_RESPONSE_DATA } from '../config'
import { Swagger, SwaggerResponses } from '../../swagger'
const fakeResponseMiddleWare: (swagger: Swagger) => Middleware = swagger => async (ctx, next) => {
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
}

export function getSwaggerPathResponse(swagger: Swagger, path: string, method: string) {
  return swagger.paths[path][method]?.responses
}

export function handlerResponse(responses: SwaggerResponses, swagger: Swagger): FakeResponseData {
  const statusOk = responses[200]
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

export default fakeResponseMiddleWare
