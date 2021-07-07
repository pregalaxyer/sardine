import { Definition, Items } from '../swagger'
import { DEFAULT_ARRAY_COUNT } from './config'
import {
  chanceInstance,
  fakeEnums,
  typeActions,
  getFormatterFunction,
  fakeByDeinition,
  getRefDefinitionName,
  fakeStringLength,
  fakeNumberAmongValue,
  fakeArrayCount,
  fakeNumber,
  fakeString,
  fakeBoolean,
  fakeRef,
  fakeArrays,
  fakeTypesArray,
  fakeObjectDefinition
} from './index'
/**
 * @description global defintion here
 */
const Chance = require('chance')
const definition: Definition = {
  type: 'object',
  properties: { id: { type: 'integer', format: 'int64' } }
}

const definitions: Record<string, Definition> = {
  pet: {
    type: 'object',
    properties: {
      type: { type: 'string', enum: ['cat', 'dog', 'pig'] },
      // @ts-ignore
      storeIds: { type: 'array', items: { type: 'integer' } }
    }
  }
}

// @ts-ignore
const numberItems: Items = {
  type: 'number',
  minimum: 1,
  maximum: 5
}
const numberEnums: number[] = [1, 3, 4]

// @ts-ignore
const stringItem: Items = {
  type: 'string',
  maxLength: 9,
  minLength: 1
}
const stringEnums: string[] = ['music', 'film', 'song']
//@ts-ignore
const arrayItem: Items = { type: 'array', items: { type: 'string' } }

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
    fakeByDeinition(definition, definitions)
    expect(triggerAction).toBeCalled()
  })

  test('fakeStringLength should create a number between max and min', () => {
    expect(fakeStringLength(0, 10)).toBeGreaterThanOrEqual(1)
    expect(fakeStringLength(0, 10)).toBeLessThanOrEqual(10)
    expect(fakeStringLength()).toEqual({})
  })
  test('fakeNumberAmongValue should create a structure with min and max property ', () => {
    expect(fakeNumberAmongValue(0, 10)).toEqual({ min: 0, max: 10 })
    expect(fakeNumberAmongValue()).toEqual({})
  })
  test('fakeArrayCount should return number', () => {
    expect(fakeArrayCount(0, 10)).toBeGreaterThanOrEqual(1)
    expect(fakeArrayCount(0, 10)).toBeLessThanOrEqual(10)
    expect(fakeArrayCount()).toBe(DEFAULT_ARRAY_COUNT)
  })

  test('fakeNumber should return number or number in enum', () => {
    const number = fakeNumber(numberItems)
    expect(number).toBeGreaterThanOrEqual(numberItems.minimum)
    expect(number).toBeLessThanOrEqual(numberItems.maximum)
    numberItems.enum = numberEnums
    const numberEnum = fakeNumber(numberItems)
    expect(numberEnums).toContain(numberEnum)
  })

  test('fakeBoolean create boolean', () => {
    const booleanArrays: boolean[] = [true, false]
    const bool: boolean = fakeBoolean()
    expect(booleanArrays).toContain(bool)
  })

  test('fakeString create string or string with specify rang', () => {
    const strLength = fakeString(stringItem).length
    expect(strLength).toBeGreaterThanOrEqual(stringItem.minLength)
    expect(strLength).toBeLessThanOrEqual(stringItem.maxLength)
    stringItem.enum = stringEnums
    const stringEnum = fakeString(stringItem)
    expect(stringEnums).toContain(stringEnum)
  })

  test('fakeTypeArrays can create an array by diffrent actions', () => {})
})
