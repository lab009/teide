import { Component as ReactComponent } from 'react'
import { Provider } from 'react-redux'

import bindClass from './lib/bindClass'
import connect from './lib/connect'
import createStore from './createStore'
import createActions from './lib/createActions'
import createReducer from './lib/createReducer'
import createReducerActions from './lib/createReducerActions'
import combineReducers from './lib/combineReducers'

class TeideComponent extends ReactComponent {
  // eslint-disable-next-line no-undef
  static defaultState = {}
  constructor(...args) {
    super(...args)
    this.state = {
      ...this.constructor.defaultState,
      ...this.state,
    }
    bindClass(this)
  }
}

export {
  TeideComponent as Component,
  connect,
  Provider,
  combineReducers,
  createReducer,
  createReducerActions,
  createActions,
  createStore,
}
