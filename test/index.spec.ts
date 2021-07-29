const Sardine = require('../dist/sardine.umd').default
import fetch from 'node-fetch'

describe('sardine lib tests', () => {
  let timer: NodeJS.Timeout
  test('mock data with sardine', async done => {
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
              expect(res).toBeDefined()
            }),
          fetch(`http://localhost:${sardine.port}/pet/1`)
            .then(res => {
              return res.json()
            })
            .then(res => {
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
