import Sardine from '../src/sardine'
import fetch from 'node-fetch'

jest.setTimeout(50000000)
/**
 * Dummy test
 */
describe('Sardine test', () => {
  test('sardine instance', async () => {
    const sardine = new Sardine({
      url: 'https://petstore.swagger.io/v2/swagger.json',
      port: 9000
    })
    setTimeout(() => {
      fetch(`http://localhost:${sardine.port}/store/inventory`)
        .then(res => {
          console.log('1', res)
          return res.json()
        })
        .then(res => {
          expect(res).toBeDefined()
        })
    }, 5000)
  })
})
