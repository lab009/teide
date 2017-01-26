import { applyMiddleware, compose, createStore } from 'redux'
import { Map, Iterable } from 'immutable'
import thunk from 'redux-thunk'
import each from 'lodash.foreach'
import { batchedSubscribe } from 'redux-batched-subscribe'
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom'

import combineReducers from './lib/combineReducers'
import transformPlugins from './lib/transformPlugins'

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

const defaultEnhancers = [
  batchedSubscribe(batchedUpdates),
]
const defaultMiddleware = [
  thunk,
]

export default ({
  plugins = [],
  middleware = [],
  enhancers = [],
  reducers = [],
  hooks = [],
  initialState = Map(),
}) => {
  if (!Array.isArray(reducers)) throw new Error('Invalid reducers option')
  if (!Array.isArray(middleware)) throw new Error('Invalid middleware option')
  if (!Array.isArray(enhancers)) throw new Error('Invalid enhancers option')
  if (!Iterable.isIterable(initialState)) throw new Error('Invalid initialState option')

  // take in the options and reconcile them with the plugins provided
  const pluginValues = transformPlugins(plugins)
  const finalReducers = [
    ...reducers,
    ...pluginValues.reducers,
  ]
  const finalMiddleware = [
    ...defaultMiddleware,
    ...middleware,
    ...pluginValues.middleware,
  ]
  const finalEnhancers = [
    ...defaultEnhancers,
    ...enhancers,
    ...pluginValues.enhancers,
  ]
  const finalHooks = [
    ...hooks,
    ...pluginValues.hooks,
  ]

  const store = createStore(
    combineReducers(...finalReducers),
    initialState,
    composeEnhancers(
      applyMiddleware(...finalMiddleware),
      ...finalEnhancers,
    ),
  )

  store.replaceReducers = (newReducers) => {
    if (!Array.isArray(newReducers)) throw new Error('Invalid newReducers option')
    return store.replaceReducer(
      combineReducers(...newReducers, ...pluginValues.reducers),
    )
  }

  // apply hooks
  each(finalHooks, fn => fn(store))

  return store
}
