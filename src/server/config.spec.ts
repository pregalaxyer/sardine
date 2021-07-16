import { DEFAULT_RESPONSE_DATA, KOA_PORT } from './config'

test('default config', () => {
  expect(DEFAULT_RESPONSE_DATA).toHaveProperty('status')
  expect(DEFAULT_RESPONSE_DATA).toHaveProperty('body')
  expect(KOA_PORT).toBe(55555)
})
