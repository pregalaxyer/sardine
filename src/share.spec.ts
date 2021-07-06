import { getSwaggerJsonFromUrl, getServerName } from './share'

describe('test the share utils', () => {
  test('fetch remote swagger json from url ', async () => {
    const data = await getSwaggerJsonFromUrl('https://petstore.swagger.io/v2/swagger.json')
    expect(data).toHaveProperty('info')
    expect(data).toHaveProperty('paths')
  })
})
