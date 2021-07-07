import {
  chanceInstance,
  fakeEnums,
  typeActions,
  getFormatterFunction,
  fakeByDeinition,
  getRefDefinitionName,
  fakeNumber
} from './index'
const Chance = require('chance')
describe('mock data tests', () => {
  test('chanceInstance should be defined', () => {
    expect(chanceInstance).toBeInstanceOf(Chance)
  })

  test('typeActions should has property string, array, number, boolean', () => {
    expect(typeActions).toHaveProperty('string')
    expect(typeActions).toHaveProperty('array')
    expect(typeActions).toHaveProperty('number')
    expect(typeActions).toHaveProperty('boolean')
  })

  test('fakeEnums return enums element', () => {
    const enums: string[] = ['male', 'female']
    expect(fakeEnums(enums)).toEqual(expect.stringMatching(/^male|female/))
  })

  test('getRefDefinitionName will output definition name', () => {
    expect(getRefDefinitionName('#/definitions/Category')).toBe('Category')
  })

  test('getFormatterFunction should return fake function', () => {
    expect(getFormatterFunction('integer')).toBeDefined()
  })

  test('fakeByDeinition function will trigger action in typeActions', () => {
    const triggerAction = jest.spyOn(typeActions, 'object')
    fakeByDeinition(
      { type: 'object', properties: { id: { type: 'integer', format: 'int64' } } },
      {}
    )
    expect(triggerAction).toBeCalled()
  })
})
