import {
  browserHistory,
  createMemoryHistory,
  Router,
  Route,
  Link,
  Redirect,
  IndexRoute,
  IndexLink,
  IndexRedirect,
  match,
  RouterContext,
  withRouter,
} from 'react-router'
import { routeActions, syncHistory, routeReducer } from 'react-router-redux'

import Auth from './lib/Auth'
import ScrollRouter from './lib/ScrollRouter'

const moduleName = 'router'

const builtinsRouter = {
  Router,
  Route,
  Link,
  Redirect,
  IndexRoute,
  IndexLink,
  IndexRedirect,
  match,
  RouterContext,
  withRouter,
}

const builtinsCustom = {
  ScrollRouter,
  Auth,
}

const builtinsHistory = {
  browserHistory,
  createMemoryHistory,
}

const getRouterState = state => state.get(moduleName).location
const createPlugin = (history) => {
  const middleware = syncHistory(history)

  return {
    reducers: {
      [moduleName]: routeReducer,
    },
    middleware,
    hook: (store) => {
      middleware.listenForReplays(store, getRouterState)
      return store
    },
  }
}

export default {
  ...builtinsRouter,
  ...builtinsCustom,
  ...builtinsHistory,
  actions: {
    [moduleName]: routeActions,
  },
  createPlugin,
}
