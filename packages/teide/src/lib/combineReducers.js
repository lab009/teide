import { combineReducers } from 'redux-immutable'
import map from 'lodash.map'
import reduceReducers from 'reduce-reducers'

const combine = (...reducers) =>
  reduceReducers(...map(reducers, v => (typeof v === 'function' ? v : combineReducers(v))))

export default combine
