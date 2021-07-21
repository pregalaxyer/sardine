import { SwaggerResponses } from '../swagger'
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

export const KOA_PORT: number = 55555

export const DEFAULT_RESPONSE: SwaggerResponses = {
  '200': {
    schema: {},
    description: 'ok'
  }
}
