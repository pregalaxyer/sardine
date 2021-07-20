import Sardine from '../src/sardine'
import fetch from 'node-fetch'

/**
 * Dummy test
 */
describe('Sardine test', () => {
  let timer: NodeJS.Timeout
  test('sardine instance', async done => {
    const sardine = new Sardine({
      url: 'https://petstore.swagger.io/v2/swagger.json',
      port: 9000
    })
    await new Promise(resolve => {
      timer = setTimeout(async () => {
        await Promise.all([
          fetch(`http://localhost:${sardine.port}/store/inventory`)
            .then(res => {
              return res.json()
            })
            .then(res => {
              console.log(1, res)
              expect(res).toBeDefined()
            }),
          fetch(`http://localhost:${sardine.port}/pet/1`)
            .then(res => {
              return res.json()
            })
            .then(res => {
              console.log(2, res)
              expect(res).toBeDefined()
            })
        ])
        resolve(1)
        done()
      }, 3000)
    })
  })
  afterAll(done => {
    clearTimeout(timer)
    done()
  })
})
