import test from 'ava'

import * as tango from '../src'

test('should export the right stuff', t => {
  t.truthy(tango.Component, 'Component')
  t.truthy(tango.connect, 'connect')
  t.truthy(tango.PropTypes, 'PropTypes')
  t.truthy(tango.Provider, 'Provider')
  t.truthy(tango.combineReducers, 'combineReducers')
  t.truthy(tango.createReducer, 'createReducer')
  t.truthy(tango.createReducerActions, 'createReducerActions')
  t.truthy(tango.createActions, 'createActions')
  t.truthy(tango.createStore, 'createStore')
})
