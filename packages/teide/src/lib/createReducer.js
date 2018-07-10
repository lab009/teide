import { pipe, toPairs, reduce, values, filter, is, mapObjIndexed, lensPath, set, view, apply } from 'ramda'
import compose from 'reduce-reducers'

import handleAction from './handleAction'

// terminology:
// container - an object that contains initialState + reducer functions
// initialState - the default state of a node and its children

const isFunction = is(Function)

const getInitialState = (container, namespace) => {
  const walker = pipe(
    toPairs,
    reduce((initialState, [key, value]) => {
      if (key === 'initialState') return initialState

      if (typeof value === 'object') {
        if (Array.isArray(initialState)) {
          throw new Error(`Reducer "${namespace || 'root'}" has a non-object initialState, so it can't have children`)
        }
        if (typeof initialState[key] !== 'undefined') {
          throw new Error(`Reducer "${namespace || 'root'}" has an initialState conflict with it's parent over "${key}"`)
        }
        const name = namespace ? `${namespace}.${key}` : key
        // eslint-disable-next-line no-param-reassign
        initialState[key] = getInitialState(value, name)
      }

      return initialState
    }, container.initialState || {})
  )
  return walker(container)
}

const createReducerNode = ({ statePath, reducer, initialState }) => (state, action = {}) => {
  // if we are the reducer container, pass them our cherry-picked state
  // otherwise pass down the full state to the next container
  const statePathLens = statePath ? lensPath(statePath) : null

  const currNodeState = (statePathLens ? view(statePathLens, state) : state) || initialState
  const nextNodeState = reducer(currNodeState, action)
  const nextRootState = statePathLens ? set(statePathLens, nextNodeState, state) : nextNodeState

  return nextRootState
}

// recursively map reducers object to an
// array of reducers that handle namespaced actions
const createReducers = (container, namespace) => {
  let hadReducers = false
  const walker = pipe(
    mapObjIndexed((value, key) => {
      if (key === 'initialState') return null
      const name = namespace ? `${namespace}.${key}` : key

      if (isFunction(value)) {
        hadReducers = true
        return handleAction(name, value)
      }

      if (typeof value === 'object') {
        // eslint-disable-next-line no-use-before-define
        return createReducer(value, name)
      }

      return null
    }),
    filter(isFunction)
  )

  const reducers = walker(container)

  return {
    name: namespace,
    isContainer: hadReducers,
    reducers,
  }
}

const createReducer = (container, namespace) => {
  const { reducers, isContainer, name } = createReducers(container, namespace)

  if (isContainer && typeof container.initialState === 'undefined') {
    throw new Error(`Reducer "${name || 'root'}" is missing an initialState`)
  }
  if (!isContainer && typeof container.initialState !== 'undefined') {
    throw new Error(`Reducer "${name || 'root'}" has no reducers, so it can't specify an initialState`)
  }

  const initialState = getInitialState(container)
  const reducer = apply(compose, values(reducers))
  const statePath = name && isContainer ? name.split('.') : null

  return createReducerNode({
    name,
    initialState,
    reducer,
    statePath,
  })
}

export default createReducer
