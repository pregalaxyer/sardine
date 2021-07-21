import { Definition, Items } from '../swagger'
import { DEFAULT_ARRAY_COUNT } from './config'
import { isString } from '../share'
import { chanceInstance } from '../sardine'
import {
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
  fakeObjectDefinition,
  fakeResponse
} from './index'
jest.mock('../share', () => ({
  __esModule: true,
  isString: jest.fn().mockImplementation(str => typeof str === 'string')
}))

/**
 * @description global defintion here
 */

const definition: Definition = {
  type: 'object',
  required: ['id'],
  properties: { id: { type: 'integer', format: 'int64' } }
}

const definitions: Record<string, Definition> = {
  Pet: {
    type: 'object',
    required: ['type', 'storeIds'],
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

// @ts-ignore
const refItem: Items = {
  $ref: '#/definitions/Pet'
}
//@ts-ignore
const arrayItem: Items = { type: 'array', items: { type: 'string' }, minItems: 1, maxItems: 4 }

describe('mock data tests', () => {
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
    chanceInstance.__DEFAULT_ARRAY_COUNT = 10
    expect(fakeArrayCount()).toBe(10)
    chanceInstance.__DEFAULT_ARRAY_COUNT = null
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

  test('fakeRef creat a fake output by ref link', () => {
    const ref = fakeRef('#/definitions/Pet', definitions)
    expect(ref).toHaveProperty('type')
    expect(ref).toHaveProperty('storeIds')
  })

  test('fakeTypesArray create an array by diffrent actions', () => {
    const arr = fakeTypesArray(arrayItem.items, typeActions['string'], 3)
    expect(arr).toHaveLength(3)
  })

  test('fakeArrays create array from items with length from minItems and maxItems', () => {
    const arrLength = fakeArrays(arrayItem, definitions).length
    expect(arrLength).toBeLessThanOrEqual(arrayItem.maxItems)
    expect(arrLength).toBeGreaterThanOrEqual(arrayItem.minItems)
    arrayItem.items.enum = stringEnums
    const arrStringEnumLength = fakeArrays(arrayItem, definitions).length
    expect(arrStringEnumLength).toBeLessThanOrEqual(arrayItem.maxItems)
    expect(arrStringEnumLength).toBeGreaterThanOrEqual(arrayItem.minItems)
    arrayItem.items = refItem
    const refArrayFirst = fakeArrays(arrayItem, definitions)[0]
    expect(refArrayFirst).toHaveProperty('type')
    // @ts-ignore
    expect(fakeArrays({}, definitions)).toHaveLength(0)
  })

  test('fakeObjectDefinition will fake object structure', () => {
    definition.properties.pet = refItem
    const obj = fakeObjectDefinition(definition, definitions)
    expect(isString).toBeCalled()
    expect(obj).toHaveProperty('id')
    expect(obj.pet).toHaveProperty('type')
  })

  test('fakeResponse fake data from scheme', () => {
    // @ts-ignore
    const response = fakeResponse({ description: 'success operation' }, {})
    expect(response).toBe('success operation')
    const responseSchema = fakeResponse(
      { schema: { type: 'object', additionalProperties: { type: 'string' } }, description: 'test' },
      definitions
    )
    expect(isString).toBeCalledWith('string')
    expect(responseSchema).toBeDefined()
    // @ts-ignore
    expect(fakeResponse({ schema: {}, description: 'ok' }, {})).toBe('ok')
  })
})
