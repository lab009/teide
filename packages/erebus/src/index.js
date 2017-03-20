import { Schema, arrayOf, valuesOf, unionOf } from 'normalizr'

import createAction from './lib/createAction'
import createRequest from './lib/createRequest'
import * as reducers from './reducers'

import { mergeOption } from './lib/mergeOptions'

export {
  Schema,
  arrayOf,
  valuesOf,
  unionOf,

  createAction,
  createRequest,
  reducers,

  mergeOption,
}
