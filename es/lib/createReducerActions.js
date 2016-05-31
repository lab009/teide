import _typeof from 'babel-runtime/helpers/typeof';
import { createAction } from 'redux-actions';
import reduce from 'lodash.reduce';

var createReducerActions = function createReducerActions(o, ns) {
  if ((typeof o === 'undefined' ? 'undefined' : _typeof(o)) !== 'object') {
    throw new Error('Passed an invalid reducer config - must be an object');
  }
  return reduce(o, function (prev, v, k) {
    if (k === 'initialState') return prev;
    var name = ns ? ns + '.' + k : k;

    if (typeof v === 'function') {
      prev[k] = createAction(name);
      return prev;
    }

    if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
      prev[k] = createReducerActions(v, name);
      return prev;
    }

    return prev;
  }, {});
};

export default createReducerActions;