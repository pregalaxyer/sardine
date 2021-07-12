import { Sardine } from '../src/sardine'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('Sardine is instantiable', () => {
    expect(
      new Sardine({
        url: ''
      })
    ).toBeInstanceOf(Sardine)
  })
})
