import { getSwaggerJsonFromUrl, getServerName } from './share'
import fetch from 'node-fetch'
jest.mock('node-fetch', () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    json: () => ({
      info: {},
      paths: {}
    })
  })
}))

describe('test the share utils', () => {
  test('fetch remote swagger json from url ', async () => {
    const url: string = 'https://petstore.swagger.io/v2/swagger.json'
    const data = await getSwaggerJsonFromUrl(url)
    expect(fetch).toBeCalledWith(url)
    expect(data).toHaveProperty('info')
    expect(data).toHaveProperty('paths')
  })
})
