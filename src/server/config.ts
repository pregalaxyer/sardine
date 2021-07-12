export interface FakeResponseData {
  status: number
  body: any
}
/**
 * default response data
 */
export const DEFAULT_RESPONSE_DATA: FakeResponseData = {
  status: 200,
  body: 'ok'
}

export const KOA_HOST: number = 9000
