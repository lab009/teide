import { createAction } from 'redux-actions'
import { pipe, toPairs, reduce } from 'ramda'

const createReducerActions = (container, namespace) => {
  if (typeof container !== 'object') {
    throw new Error('Passed an invalid reducer config - must be an object')
  }

  const walker = pipe(
    toPairs,
    reduce((actions, [key, value]) => {
      if (key === 'initialState') return actions

      const name = namespace ? `${namespace}.${key}` : key
      if (typeof value === 'function') {
        actions[key] = createAction(name)
      }
      if (typeof value === 'object') {
        actions[key] = createReducerActions(value, name)
      }

      return actions
    }, {})
  )
  return walker(container)
}

export default createReducerActions
