/**
 * @description the default config for mock
 * BASE64 => will mock by node buffer
 * https://github.com/nuysoft/Mock/wiki/Syntax-Specification
 */
export const defaultMockRules: Record<string, string | boolean | number> = {
  // mock number when property doesnot have minimun & maximun or default
  INT32: '-2147483648-2147483647',
  INT32_VALUE: 100,
  INT64: '-9223372036854776000-9223372036854776000',
  INT64_VALUE: 10000,
  FLOAT: '10-100.0000001-9999999',
  FLOAT_VALUE: 90.0000001,
  DOUBLE: '10-100.000000000000001-9999999999999999',
  DOUBLE_VALUE: 90.000000000000001,
  /**
   * @description 1/2
   */
  BOOLEAN: '1',
  BOOLEAN_VALUE: true,
  DATE_FORMAT: 'yyyy-MM-dd HH:mm:ss'
}

/**
 * @Date https://github.com/nuysoft/Mock/wiki/Date
 */


