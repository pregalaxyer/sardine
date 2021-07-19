import Sardine from '../src/sardine'
import fetch from 'node-fetch'

jest.setTimeout(100000)
/**
 * Dummy test
 */
describe('Sardine test', () => {
  test('sardine instance', async () => {
    const sardine = new Sardine({
      url: 'https://petstore.swagger.io/v2/swagger.json',
      port: 9000
    })
    await new Promise(resolve => {
      setTimeout(async () => {
        await Promise.all([
          fetch(`http://localhost:${sardine.port}/store/inventory`)
            .then(res => {
              return res.json()
            })
            .then(res => {
              console.log(1, res)
              expect(res).toBeDefined()
            }),
          fetch(`http://localhost:${sardine.port}/store/inventory`)
            .then(res => {
              return res.json()
            })
            .then(res => {
              console.log(2, res)
              expect(res).toBeDefined()
            })
        ])
        resolve(1)
      }, 3000)
    })
  })
})
