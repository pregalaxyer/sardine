import { typeMapChanceConfig, DEFAULT_ARRAY_COUNT } from './config'

test('type mapping should contains boolean, int32, float32, number', () => {
  expect(typeMapChanceConfig).toHaveProperty('boolean')
  expect(typeMapChanceConfig).toHaveProperty('int32')
  expect(typeMapChanceConfig).toHaveProperty('float32')
})

test('DEFAULT_ARRAY_COUNT should be 3', () => {
  expect(DEFAULT_ARRAY_COUNT).toBe(3)
})
