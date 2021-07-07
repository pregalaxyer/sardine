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
 * @description default array count
 *  example: chance.pickset(array,3)
 */
export const DEFAULT_ARRAY_COUNT: number = 3

/**
 *
 */
export const FAKE_OPTIONAL_TRIGGER: boolean = true
