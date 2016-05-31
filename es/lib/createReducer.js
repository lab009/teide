import _typeof from 'babel-runtime/helpers/typeof';
import { handleAction } from 'redux-actions';
import reduceReducers from 'reduce-reducers';
import mapValues from 'lodash.mapvalues';
import values from 'lodash.values';
import reduce from 'lodash.reduce';
import filter from 'lodash.filter';
import { Map, Iterable } from 'immutable';

// terminology:
// container - an object that contains initialState + reducer functions
// initialState - the default state of a node and its children

var isFunction = function isFunction(v) {
  return typeof v === 'function';
};

var getInitialState = function getInitialState(o, ns) {
  return reduce(o, function (prev, v, k) {
    if (k === 'initialState') return prev;
    var name = ns ? ns + '.' + k : k;

    if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
      if (!Map.isMap(prev)) {
        throw new Error('Reducer "' + (ns || 'root') + '" has a non-map initialState, so it can\'t have children');
      }
      if (typeof prev.get(k) !== 'undefined') {
        throw new Error('Reducer "' + (ns || 'root') + '" has an initialState conflict with it\'s parent over "' + k + '"');
      }
      return prev.set(k, getInitialState(v, name));
    }
    return prev;
  }, o.initialState || Map());
};

var createReducerNode = function createReducerNode(_ref) {
  var name = _ref.name;
  var statePath = _ref.statePath;
  var reducer = _ref.reducer;
  var initialState = _ref.initialState;
  return function (state) {
    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // if we are the reducer container, pass them our cherry-picked state
    // otherwise pass down the full state to the next container
    var currNodeState = (statePath ? state.getIn(statePath) : state) || initialState;
    if (!Iterable.isIterable(currNodeState)) {
      throw new Error('Reducer "' + (name || 'root') + '" was given a non-Immutable state!');
    }
    var nextNodeState = reducer(currNodeState, action);
    if (!Iterable.isIterable(nextNodeState)) {
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
  var reducers = filter(mapValues(o, function (v, k) {
    if (k === 'initialState') return;
    var name = parentName ? parentName + '.' + k : k;

    if (isFunction(v)) {
      hadReducers = true;
      return handleAction(name, v);
    }

    if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
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
  var _createReducers = createReducers(o, parentName);

  var reducers = _createReducers.reducers;
  var isContainer = _createReducers.isContainer;
  var name = _createReducers.name;

  if (isContainer && typeof o.initialState === 'undefined') {
    throw new Error('Reducer "' + (name || 'root') + '" is missing an initialState');
  }
  if (!isContainer && typeof o.initialState !== 'undefined') {
    throw new Error('Reducer "' + (name || 'root') + '" has no reducers, so it can\'t specify an initialState');
  }
  var initialState = getInitialState(o);
  if (!Iterable.isIterable(initialState)) {
    throw new Error('Reducer "' + (name || 'root') + '" is missing an Immutable initialState');
  }

  var reducer = reduceReducers.apply(undefined, values(reducers));
  var statePath = name && isContainer ? name.split('.') : undefined;
  return createReducerNode({
    name: name,
    initialState: initialState,
    reducer: reducer,
    statePath: statePath
  });
};

export default createReducer;