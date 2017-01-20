import test from 'ava'

import * as teide from '../src'

test('should export the right stuff', (t) => {
  t.truthy(teide.Component, 'Component')
  t.truthy(teide.connect, 'connect')
  t.truthy(teide.CSSModules, 'CSSModules')
  t.truthy(teide.PropTypes, 'PropTypes')
  t.truthy(teide.Provider, 'Provider')
  t.truthy(teide.combineReducers, 'combineReducers')
  t.truthy(teide.createReducer, 'createReducer')
  t.truthy(teide.createReducerActions, 'createReducerActions')
  t.truthy(teide.createActions, 'createActions')
  t.truthy(teide.createStore, 'createStore')
})
