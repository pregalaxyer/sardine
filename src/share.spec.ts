import { getSwaggerJsonFromUrl, getServerName, objectTag, isObject } from './share'
import fetch from 'node-fetch'
import { Swagger } from './swagger'
jest.mock('node-fetch', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(async url => ({
    json: () => ({
      info: {
        title: 'test serve name'
      },
      paths: {}
    })
  }))
}))
let swagger: Swagger | undefined | void
const url: string = 'https://petstore.swagger.io/v2/swagger.json'
beforeAll(async () => {
  swagger = await getSwaggerJsonFromUrl(url)
})
describe('test the share utils', () => {
  test('fetch remote swagger json from url ', async () => {
    expect(fetch).toBeCalledWith(url)
    expect(swagger).toHaveProperty('info')
    expect(swagger).toHaveProperty('paths')
  })
  test('getServerName output the name in swagger info', () => {
    expect(getServerName(swagger as Swagger)).toBeDefined()
  })
  test('value is object', () => {
    expect(objectTag).toBe('[object Object]')
    expect(isObject([])).toBeFalsy()
    expect(isObject(new Date())).toBeFalsy()
    expect(isObject(new RegExp(/\d/))).toBeFalsy()
    expect(isObject({})).toBeTruthy()
  })
})
