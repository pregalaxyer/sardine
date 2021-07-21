import { initKoa } from './index'
const cors = require('@koa/cors')
import Koa from 'koa'
import fakeResponseMiddleWare from './middleware/response'
jest.mock('@koa/cors')

jest.mock('./middleware/response', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(swagger => {})
}))

jest.mock('koa', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(function Koa() {
    let object = {
      listen: jest.fn(),
      use: jest.fn()
    }
    return object
  })
}))

test('initKoa tests', () => {
  // @ts-ignore
  const app = initKoa({})
  expect(Koa).toBeCalled()
  expect(fakeResponseMiddleWare).toBeCalled
})
