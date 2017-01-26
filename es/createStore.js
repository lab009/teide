'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _immutable = require('immutable');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _lodash = require('lodash.foreach');

var _lodash2 = _interopRequireDefault(_lodash);

var _reduxBatchedSubscribe = require('redux-batched-subscribe');

var _reactDom = require('react-dom');

var _combineReducers = require('./lib/combineReducers');

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _transformPlugins = require('./lib/transformPlugins');

var _transformPlugins2 = _interopRequireDefault(_transformPlugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
var composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : _redux.compose;

var defaultEnhancers = [(0, _reduxBatchedSubscribe.batchedSubscribe)(_reactDom.unstable_batchedUpdates)];
var defaultMiddleware = [_reduxThunk2.default];

exports.default = function (_ref) {
  var _ref$plugins = _ref.plugins,
      plugins = _ref$plugins === undefined ? [] : _ref$plugins,
      _ref$middleware = _ref.middleware,
      middleware = _ref$middleware === undefined ? [] : _ref$middleware,
      _ref$enhancers = _ref.enhancers,
      enhancers = _ref$enhancers === undefined ? [] : _ref$enhancers,
      _ref$reducers = _ref.reducers,
      reducers = _ref$reducers === undefined ? [] : _ref$reducers,
      _ref$hooks = _ref.hooks,
      hooks = _ref$hooks === undefined ? [] : _ref$hooks,
      _ref$initialState = _ref.initialState,
      initialState = _ref$initialState === undefined ? (0, _immutable.Map)() : _ref$initialState;

  if (!Array.isArray(reducers)) throw new Error('Invalid reducers option');
  if (!Array.isArray(middleware)) throw new Error('Invalid middleware option');
  if (!Array.isArray(enhancers)) throw new Error('Invalid enhancers option');
  if (!_immutable.Iterable.isIterable(initialState)) throw new Error('Invalid initialState option');

  // take in the options and reconcile them with the plugins provided
  var pluginValues = (0, _transformPlugins2.default)(plugins);
  var finalReducers = [].concat(_toConsumableArray(reducers), _toConsumableArray(pluginValues.reducers));
  var finalMiddleware = [].concat(defaultMiddleware, _toConsumableArray(middleware), _toConsumableArray(pluginValues.middleware));
  var finalEnhancers = [].concat(defaultEnhancers, _toConsumableArray(enhancers), _toConsumableArray(pluginValues.enhancers));
  var finalHooks = [].concat(_toConsumableArray(hooks), _toConsumableArray(pluginValues.hooks));

  var store = (0, _redux.createStore)(_combineReducers2.default.apply(undefined, _toConsumableArray(finalReducers)), initialState, composeEnhancers.apply(undefined, [_redux.applyMiddleware.apply(undefined, _toConsumableArray(finalMiddleware))].concat(_toConsumableArray(finalEnhancers))));

  store.replaceReducers = function (newReducers) {
    if (!Array.isArray(newReducers)) throw new Error('Invalid newReducers option');
    return store.replaceReducer(_combineReducers2.default.apply(undefined, _toConsumableArray(newReducers).concat(_toConsumableArray(pluginValues.reducers))));
  };

  // apply hooks
  (0, _lodash2.default)(finalHooks, function (fn) {
    return fn(store);
  });

  return store;
};