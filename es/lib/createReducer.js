'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _reduxActions = require('redux-actions');

var _reduceReducers = require('reduce-reducers');

var _reduceReducers2 = _interopRequireDefault(_reduceReducers);

var _lodash = require('lodash.mapvalues');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.values');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.reduce');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.filter');

var _lodash8 = _interopRequireDefault(_lodash7);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// terminology:
// container - an object that contains initialState + reducer functions
// initialState - the default state of a node and its children

var isFunction = function isFunction(v) {
  return typeof v === 'function';
};

var getInitialState = function getInitialState(o, ns) {
  return (0, _lodash6.default)(o, function (prev, v, k) {
    if (k === 'initialState') return prev;
    var name = ns ? ns + '.' + k : k;

    if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
      if (!_immutable.Map.isMap(prev)) {
        throw new Error('Reducer "' + (ns || 'root') + '" has a non-map initialState, so it can\'t have children');
      }
      if (typeof prev.get(k) !== 'undefined') {
        throw new Error('Reducer "' + (ns || 'root') + '" has an initialState conflict with it\'s parent over "' + k + '"');
      }
      return prev.set(k, getInitialState(v, name));
    }
    return prev;
  }, o.initialState || (0, _immutable.Map)());
};

var createReducerNode = function createReducerNode(_ref) {
  var name = _ref.name,
      statePath = _ref.statePath,
      reducer = _ref.reducer,
      initialState = _ref.initialState;
  return function (state) {
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // if we are the reducer container, pass them our cherry-picked state
    // otherwise pass down the full state to the next container
    var currNodeState = (statePath ? state.getIn(statePath) : state) || initialState;
    if (!_immutable.Iterable.isIterable(currNodeState)) {
      throw new Error('Reducer "' + (name || 'root') + '" was given a non-Immutable state!');
    }
    var nextNodeState = reducer(currNodeState, action);
    if (!_immutable.Iterable.isIterable(nextNodeState)) {
      throw new Error('Reducer "' + (name || 'root') + '" returned a non-Immutable state!');
    }
    var nextRootState = statePath ? state.setIn(statePath, nextNodeState) : nextNodeState;

    return nextRootState;
  };
};

// recursively map reducers object to an
// array of reducers that handle namespaced actions
var createReducers = function createReducers(o, parentName) {
  var hadReducers = false;
  var reducers = (0, _lodash8.default)((0, _lodash2.default)(o, function (v, k) {
    if (k === 'initialState') return;
    var name = parentName ? parentName + '.' + k : k;

    if (isFunction(v)) {
      hadReducers = true;
      // eslint-disable-next-line consistent-return
      return (0, _reduxActions.handleAction)(name, v, null);
    }

    if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
      // eslint-disable-next-line no-use-before-define, consistent-return
      return createReducer(v, name);
    }
  }), isFunction);

  return {
    name: parentName,
    isContainer: hadReducers,
    reducers: reducers
  };
};

var createReducer = function createReducer(o, parentName) {
  var _createReducers = createReducers(o, parentName),
      reducers = _createReducers.reducers,
      isContainer = _createReducers.isContainer,
      name = _createReducers.name;

  if (isContainer && typeof o.initialState === 'undefined') {
    throw new Error('Reducer "' + (name || 'root') + '" is missing an initialState');
  }
  if (!isContainer && typeof o.initialState !== 'undefined') {
    throw new Error('Reducer "' + (name || 'root') + '" has no reducers, so it can\'t specify an initialState');
  }
  var initialState = getInitialState(o);
  if (!_immutable.Iterable.isIterable(initialState)) {
    throw new Error('Reducer "' + (name || 'root') + '" is missing an Immutable initialState');
  }

  var reducer = _reduceReducers2.default.apply(undefined, _toConsumableArray((0, _lodash4.default)(reducers)));
  var statePath = name && isContainer ? name.split('.') : undefined;
  return createReducerNode({
    name: name,
    initialState: initialState,
    reducer: reducer,
    statePath: statePath
  });
};

exports.default = createReducer;