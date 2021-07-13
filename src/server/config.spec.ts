import { DEFAULT_RESPONSE_DATA, KOA_HOST } from './config'

test('default config', () => {
  expect(DEFAULT_RESPONSE_DATA).toHaveProperty('status')
  expect(DEFAULT_RESPONSE_DATA).toHaveProperty('body')
  expect(KOA_HOST).toBe(9000)
})
