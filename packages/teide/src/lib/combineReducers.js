import Immutable from 'immutable'
import map from 'lodash.map'
import reduceReducers from 'reduce-reducers'

const validateNextState = (nextState, reducerName, action) => {
  if (nextState === undefined) {
    throw new Error(
      `Reducer "${reducerName}" returned undefined when handling "${action.type}" action. To ignore an action, you must explicitly return the previous state.`,
    )
  }
}

const combineReducers = (reducers, getDefaultState = Immutable.Map) => {
  const reducerKeys = Object.keys(reducers)

  return (inputState = getDefaultState(), action) =>
    inputState.withMutations((temporaryState) => {
      reducerKeys.forEach((reducerName) => {
        const reducer = reducers[reducerName]
        const currentDomainState = temporaryState.get(reducerName)
        const nextDomainState = reducer(currentDomainState, action)

        validateNextState(nextDomainState, reducerName, action)

        temporaryState.set(reducerName, nextDomainState)
      })
    })
}

const combine = (...reducers) => reduceReducers(...map(reducers, v => (typeof v === 'function' ? v : combineReducers(v))))

export default combine
