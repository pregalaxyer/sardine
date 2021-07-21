import fakeResponseMiddleWare, { getSwaggerPathResponse, handlerResponse } from './response'
import { getSwaggerJsonFromUrl } from '../../share'
import { Swagger } from '../../swagger'
import { DEFAULT_RESPONSE_DATA, DEFAULT_RESPONSE } from '../config'
let swagger: Swagger
beforeAll(async () => {
  swagger = await getSwaggerJsonFromUrl('https://petstore.swagger.io/v2/swagger.json')
})

describe('response middleware tests', () => {
  test('fakeResponseMiddleWare tests', async () => {
    const middlewareFunction = fakeResponseMiddleWare(swagger)
    const ctx: { request: { path: string; method: string }; body?: any; status?: number } = {
      request: { path: '/pet', method: 'post' }
    }
    const next = async () => {}
    // @ts-ignore
    await middlewareFunction(ctx, next)
    expect(ctx.status).toBe(405)
    expect(ctx.body).toBe('Invalid input')
  })
  test('getSwaggerPathResponse will output swagger response ', () => {
    const response = getSwaggerPathResponse(swagger, '/pet', 'post')
    expect(response).toHaveProperty('405')
    const responseMathReg = getSwaggerPathResponse(swagger, '/pet/{petId}', 'get')
    expect(responseMathReg).toBeDefined()
    const defaultResponse = getSwaggerPathResponse(swagger, '/pet/{petId}/{sdsd}', 'get')
    expect(defaultResponse).toBe(DEFAULT_RESPONSE)
  })
  test('handlerResponse will create fake response as expect', () => {
    const { status, body } = handlerResponse(
      getSwaggerPathResponse(swagger, '/pet', 'post'),
      swagger
    )
    expect(status).toBe(405)
    expect(body).toBe('Invalid input')
    let okResponses = getSwaggerPathResponse(swagger, '/store/inventory', 'get')
    const { status: statusOk, body: bodyOk } = handlerResponse(okResponses, swagger)
    expect(statusOk).toBe(200)
    expect(bodyOk).toBeDefined()
    okResponses = {}
    const defaultFakeData = handlerResponse(okResponses, swagger)
    expect(defaultFakeData).toStrictEqual(DEFAULT_RESPONSE_DATA)
  })
})
