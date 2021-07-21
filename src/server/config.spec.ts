import { DEFAULT_RESPONSE_DATA, KOA_PORT, DEFAULT_RESPONSE } from './config'

test('default config', () => {
  expect(DEFAULT_RESPONSE_DATA).toHaveProperty('status')
  expect(DEFAULT_RESPONSE_DATA).toHaveProperty('body')
  expect(DEFAULT_RESPONSE).toHaveProperty('200')
  expect(KOA_PORT).toBe(55555)
})
