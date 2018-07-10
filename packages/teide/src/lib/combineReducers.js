import { map } from 'ramda'
import compose from 'reduce-reducers'

import produce from './produce'

const createEmptyObject = () => ({})

const validateNextState = (nextState, reducerName, action) => {
  if (nextState === undefined) {
    throw new Error(
      `Reducer "${reducerName}" returned undefined when handling "${action.type}" action. To ignore an action, you must explicitly return the previous state.`
    )
  }
}

const combineReducers = (reducers, getDefaultState = createEmptyObject) => {
  const reducerKeys = Object.keys(reducers)

  return (inputState = getDefaultState(), action) =>
    produce(reducerKeys.join('|'), inputState, (draft) => {
      reducerKeys.forEach((reducerName) => {
        const reducer = reducers[reducerName]
        const currentDomainState = draft[reducerName]
        const nextDomainState = reducer(currentDomainState, action)

        validateNextState(nextDomainState, reducerName, action)

        draft[reducerName] = nextDomainState
      })
    })
}

const combine = (...reducers) =>
  compose(...map(v => (typeof v === 'function' ? v : combineReducers(v)), reducers))

export default combine
