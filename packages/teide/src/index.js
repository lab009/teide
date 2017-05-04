import { Component as ReactComponent } from 'react'
import RPropTypes from 'prop-types'
import { Provider } from 'react-redux'
import IPropTypes from 'react-immutable-proptypes'
import bindClass from './lib/bindClass'
import connect from './lib/connect'
import createStore from './createStore'
import createActions from './lib/createActions'
import createReducer from './lib/createReducer'
import createReducerActions from './lib/createReducerActions'
import combineReducers from './lib/combineReducers'

class TeideComponent extends ReactComponent {
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

const PropTypes = {
  ...IPropTypes,
  ...RPropTypes,
}

export {
  TeideComponent as Component,
  connect,
  PropTypes,
  Provider,
  combineReducers,
  createReducer,
  createReducerActions,
  createActions,
  createStore,
}
