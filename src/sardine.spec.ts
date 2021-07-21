import Sardine, { chanceInstance } from './sardine'
import { getSwaggerJsonFromUrl } from './share'
import { initKoa } from './server'

jest.mock('./share', () => ({
  __esModule: true,
  getSwaggerJsonFromUrl: jest.fn().mockResolvedValue({})
}))
jest.mock('./server', () => ({
  __esModule: true,
  initKoa: jest.fn().mockReturnValue({
    use: (middleware: Function) => {
      middleware()
    },
    listen: () => {
      console.log('jest mock koa listen')
    }
  })
}))

describe('Sardine test', () => {
  test('chanceInstance should be defined', () => {
    const Chance = require('chance')
    expect(chanceInstance).toBeInstanceOf(Chance)
  })

  test('sardine class', async () => {
    const koaMiddleware = jest.fn()
    const sardine = new Sardine({
      url: 'https://petstore.swagger.io/v2/swagger.json',
      port: 9000,
      koaMiddleware
    })
    const log = jest.spyOn(console, 'log')
    await new Promise(resolve => {
      const timer = setTimeout(() => {
        resolve({})
        clearTimeout(timer)
      }, 1000)
    })
    expect(getSwaggerJsonFromUrl).toBeCalled()
    expect(initKoa).toBeCalled()
    expect(koaMiddleware).toBeCalled()
    expect(log).toBeCalled()
  })
})
