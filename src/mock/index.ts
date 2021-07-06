import Chance from 'chance'
import { Definition, Items, Swagger } from '../swagger'
import { typeMapChanceConfig, DEFAULT_ARRAY_COUNT } from './config'

export const chanceInstance = new Chance()

export function fakeByDeinition(definition: Definition | Items) {
  switch (definition.type) {
    // @ts-ignore
    case 'object':
      return fakeObjectDefinition(definition as Definition)
    case 'string':
      return fakeString(definition)
  }
}

export function fakeObjectDefinition(definition: Definition) {
  const mock: Record<string, any> = {}
  const properties = definition.properties
  Object.entries(properties).forEach(([key, value]) => {
    if (Array.isArray(definition.enum)) {
      mock[key] = fakeEnums(definition.enum) as string
      return
    }
    if (value.format) {
      const format: string = value.format || value.type
      // @ts-ignore
      const formatter: Function = chanceInstance[typeMapChanceConfig[format] || format]
      switch (value.type) {
        case 'number':
          mock[key] = fakeNumber(definition)
          break
        case 'string':
          mock[key] = fakeString(definition)
          break
        case 'boolean':
          mock[key] = formatter()
          break
        case 'array':
          mock[key] = fakeByDeinition(value.items)
          break
        default:
          break
      }
    }
  })
  return mock
}

interface StringLength {
  length: number
}

export function fakeStringLength(minLength?: number, maxLength?: number): StringLength | {} {
  return maxLength
    ? chanceInstance.integer({
        min: minLength || 1,
        max: maxLength
      })
    : {}
}
interface NumberAmongValue {
  min: number
  max: number
}

export function fakeNumberAmongValue(min?: number, max?: number): NumberAmongValue | {} {
  return max ? { min: min || 0, max } : {}
}

export function fakeEnums(enums: Array<string | number | boolean>): string | number | boolean {
  return chanceInstance.pickone(enums)
}

export function fakeArrayCount(min?: number, max?: number): number {
  return max && max > 1 ? chanceInstance.integer({ min: min || 0, max }) : DEFAULT_ARRAY_COUNT
}

type ItemsType = Exclude<Pick<Items, 'type'>['type'], 'file'>

export function fakeArrays(definition: Definition | Items): unknown[] {
  const fakeCount: number = fakeArrayCount(definition.minItems, definition.maxItems)
  const fakeSourceArrays: Array<any> = definition.enum || definition.items.enum || []
  /**
   * @comment has source arrays
   */
  if (fakeSourceArrays.length) {
    return chanceInstance.pickset(fakeSourceArrays, fakeCount)
  }
  /**
   * @comment handler $refs
   */
  if (definition.items.$ref) {
  }
  /**
   * https://swagger.io/specification/v2/#swaggerSchemes
   * type property Required. The internal type of the array. The value MUST be one of "string", "number", "integer", "boolean", or "array". Files and models are not allowed.
   */
  if (definition.items.type) {
    const type: ItemsType = definition.items.type as ItemsType
    if (type === 'array') {
      return fakeArrays(definition.items)
    }
    return fakeTypesArray(definition.items, typeActions[type], fakeCount)
  }

  return []
}

export const typeActions: Record<'string' | 'number' | 'boolean' | 'integer', Function> = {
  string: fakeString,
  number: fakeNumber,
  integer: fakeNumber,
  boolean: fakeBoolean
}

export function fakeTypesArray(item: Items, typeAction: Function, count: number): unknown[] {
  let stringArray: string[] = []
  for (let i = 0; i < count; i++) {
    stringArray.push(typeAction(item))
  }
  return stringArray
}

export function fakeString(definition: Definition | Items): string {
  if (Array.isArray(definition.enum)) {
    return fakeEnums(definition.enum) as string
  }
  const format: string = definition.format || definition.type
  // @ts-ignore
  const formatter: Function = chanceInstance[typeMapChanceConfig[format] || format]
  return formatter(fakeStringLength)
}

export function fakeNumber(definition: Definition | Items): number {
  if (Array.isArray(definition.enum)) {
    return fakeEnums(definition.enum) as number
  }
  const format: string = definition.format || definition.type
  // @ts-ignore
  const formatter: Function = chanceInstance[typeMapChanceConfig[format] || format]
  return formatter(fakeNumberAmongValue)
}

export function fakeBoolean(definition: Definition | Items): boolean {
  if (Array.isArray(definition.enum)) {
    return fakeEnums(definition.enum) as boolean
  }
  const format: string = definition.format || definition.type
  // @ts-ignore
  const formatter: Function = chanceInstance[typeMapChanceConfig[format] || format]
  return formatter()
}
