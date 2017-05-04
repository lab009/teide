import { createAction } from 'redux-actions'
import mapValues from 'lodash/mapValues'

// equiv of redux createAction but recursive

const createActions = (actions, dispatch) => {
  if (typeof dispatch !== 'function') throw new Error('Missing dispatch argument in createActions')

  // map string to a fn and pass back through
  if (typeof actions === 'string') return createActions(createAction(actions), dispatch)

  // wrap function in a dispatch
  if (typeof actions === 'function') {
    const fn = (...args) => {
      const action = actions(...args)
      dispatch(action)
      return action
    }
    // Copy meta
    Object.keys(actions).forEach((k) => {
      fn[k] = actions[k]
    })
    return fn
  }

  // iterate through objects and do mapping
  return mapValues(actions, action => createActions(action, dispatch))
}

export default createActions
