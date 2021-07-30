import {
  typeMapChanceConfig,
  DEFAULT_ARRAY_COUNT,
  FAKE_OPTIONAL_TRIGGER,
  FAKE_BY_DEFAULT_RATE,
  FAKE_BY_DEFAULT,
  MAX_NEST_STACK_SIZE
} from './config'

test('type mapping should contains boolean, int32, float32, number', () => {
  expect(typeMapChanceConfig).toHaveProperty('boolean')
  expect(typeMapChanceConfig).toHaveProperty('int32')
  expect(typeMapChanceConfig).toHaveProperty('float32')
})

test('config const tests', () => {
  expect(DEFAULT_ARRAY_COUNT).toBe(3)
  expect(FAKE_BY_DEFAULT_RATE).toBe(1)
  expect(MAX_NEST_STACK_SIZE).toBe(5)
  expect(FAKE_BY_DEFAULT).toBeTruthy()
  expect(FAKE_OPTIONAL_TRIGGER).toBeFalsy()
})
