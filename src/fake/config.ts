/**
 * @description type to chance
 * https://chancejs.com
 */
export const typeMapChanceConfig: Record<string, any> = {
  boolean: 'bool',
  null: 'falsy',
  float32: 'floating',
  float64: 'floating',
  number: 'integer',
  int32: 'integer',
  int64: 'integer'
}
/**
 * @description default array count, will overwrite by fake options
 *  example: chance.pickset(array,3)
 */
export const DEFAULT_ARRAY_COUNT: number = 3

/**
 * @description default optional trigger, will overwrite by fake options
 */
export const FAKE_OPTIONAL_TRIGGER: boolean = true

/**
 * @description use default value
 */
export const FAKE_BY_DEFAULT: boolean = true

/**
 * @description use default rates [0~1]
 */
export const FAKE_BY_DEFAULT_RATE: number = 1
