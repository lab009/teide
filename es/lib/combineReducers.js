import { combineReducers } from '@eagle/redux-immutablejs';
import map from 'lodash.map';
import reduceReducers from 'reduce-reducers';

var combine = function combine() {
  for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
    reducers[_key] = arguments[_key];
  }

  return reduceReducers.apply(undefined, map(reducers, function (v) {
    return typeof v === 'function' ? v : combineReducers(v);
  }));
};

export default combine;