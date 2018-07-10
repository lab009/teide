import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import thunk from 'redux-thunk'
import { forEach } from 'ramda'

import combineReducers from './lib/combineReducers'
import transformPlugins from './lib/transformPlugins'

// If Redux DevTools Extension is installed use it
const composeEnhancers = composeWithDevTools

const defaultMiddleware = [thunk]

export default ({
  plugins = [],
  middleware = [],
  enhancers = [],
  reducers = [],
  hooks = [],
  initialState = {},
}) => {
  if (!Array.isArray(reducers)) throw new Error('Invalid reducers option')
  if (!Array.isArray(middleware)) throw new Error('Invalid middleware option')
  if (!Array.isArray(enhancers)) throw new Error('Invalid enhancers option')
  if (!Array.isArray(plugins)) throw new Error('Invalid plugins argument')

  // take in the options and reconcile them with the plugins provided
  const pluginValues = transformPlugins(plugins)
  const finalReducers = [...reducers, ...pluginValues.reducers]
  const finalMiddleware = [...defaultMiddleware, ...middleware, ...pluginValues.middleware]
  const finalEnhancers = [...enhancers, ...pluginValues.enhancers]
  const finalHooks = [...hooks, ...pluginValues.hooks]

  const store = createStore(
    combineReducers(...finalReducers),
    initialState,
    composeEnhancers(applyMiddleware(...finalMiddleware), ...finalEnhancers)
  )

  store.replaceReducers = (newReducers) => {
    if (!Array.isArray(newReducers)) throw new Error('Invalid newReducers option')
    return store.replaceReducer(combineReducers(...newReducers, ...pluginValues.reducers))
  }

  // apply hooks
  forEach(hook => hook(store), finalHooks)

  return store
}
