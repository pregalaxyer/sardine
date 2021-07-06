import { chanceInstance, fakeEnums } from './index'

describe('mock data tests', () => {
  test('chanceInstance should be defined', () => {
    expect(chanceInstance).toBeDefined()
  })

  test('fakeEnums return enums element', () => {
    const enums: string[] = ['male', 'female']
    expect(fakeEnums(enums)).toBe(expect.stringMatching(/male|female/))
  })
})
