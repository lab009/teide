import { applyMiddleware, compose, createStore } from 'redux';
import { Map, Iterable } from 'immutable';
import thunk from 'redux-thunk';
import each from 'lodash.foreach';
import { batchedSubscribe } from 'redux-batched-subscribe';
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom';

import combineReducers from './lib/combineReducers';
import transformPlugins from './lib/transformPlugins';

var identity = function identity(v) {
  return v;
};

var devtools = typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : identity;

var defaultEnhancers = [batchedSubscribe(batchedUpdates)];
var defaultMiddleware = [thunk];

export default (function (_ref) {
  var _ref$plugins = _ref.plugins;
  var plugins = _ref$plugins === undefined ? [] : _ref$plugins;
  var _ref$middleware = _ref.middleware;
  var middleware = _ref$middleware === undefined ? [] : _ref$middleware;
  var _ref$enhancers = _ref.enhancers;
  var enhancers = _ref$enhancers === undefined ? [] : _ref$enhancers;
  var _ref$reducers = _ref.reducers;
  var reducers = _ref$reducers === undefined ? [] : _ref$reducers;
  var _ref$hooks = _ref.hooks;
  var hooks = _ref$hooks === undefined ? [] : _ref$hooks;
  var _ref$initialState = _ref.initialState;
  var initialState = _ref$initialState === undefined ? Map() : _ref$initialState;

  if (!Array.isArray(reducers)) throw new Error('Invalid reducers option');
  if (!Array.isArray(middleware)) throw new Error('Invalid middleware option');
  if (!Array.isArray(enhancers)) throw new Error('Invalid enhancers option');
  if (!Iterable.isIterable(initialState)) throw new Error('Invalid initialState option');

  // take in the options and reconcile them with the plugins provided
  var pluginValues = transformPlugins(plugins);
  var finalReducers = [].concat(reducers, pluginValues.reducers);
  var finalMiddleware = [].concat(defaultMiddleware, middleware, pluginValues.middleware);
  var finalEnhancers = [].concat(defaultEnhancers, enhancers, pluginValues.enhancers, [devtools]);
  var finalHooks = [].concat(hooks, pluginValues.hooks);

  var store = createStore(combineReducers.apply(undefined, finalReducers), initialState, compose.apply(undefined, [applyMiddleware.apply(undefined, finalMiddleware)].concat(finalEnhancers)));

  store.replaceReducers = function (newReducers) {
    if (!Array.isArray(newReducers)) throw new Error('Invalid newReducers option');
    return store.replaceReducer(combineReducers.apply(undefined, newReducers.concat(pluginValues.reducers)));
  };

  // apply hooks
  each(finalHooks, function (fn) {
    return fn(store);
  });

  return store;
});