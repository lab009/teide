import { createAction } from 'redux-actions'
import { map } from 'ramda'

// equiv of redux createAction but recursive

const createActions = (actions, dispatch) => {
  if (typeof dispatch !== 'function') throw new Error('Missing dispatch argument in createActions')

  // map string to a fn and pass back through
  if (typeof actions === 'string') return createActions(createAction(actions), dispatch)

  // wrap function in a dispatch
  if (typeof actions === 'function') {
    const fn = (...args) => {
      const action = actions(...args)
      return dispatch(action) || action
    }
    // Copy meta
    Object.keys(actions).forEach((k) => {
      fn[k] = actions[k]
    })
    return fn
  }

  // iterate through objects and do mapping
  return map(action => createActions(action, dispatch), actions)
}

export default createActions
