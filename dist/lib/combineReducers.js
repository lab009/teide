'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxImmutablejs = require('@lab009/redux-immutablejs');

var _lodash = require('lodash.map');

var _lodash2 = _interopRequireDefault(_lodash);

var _reduceReducers = require('reduce-reducers');

var _reduceReducers2 = _interopRequireDefault(_reduceReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var combine = function combine() {
  for (var _len = arguments.length, reducers = Array(_len), _key = 0; _key < _len; _key++) {
    reducers[_key] = arguments[_key];
  }

  return _reduceReducers2.default.apply(undefined, _toConsumableArray((0, _lodash2.default)(reducers, function (v) {
    return typeof v === 'function' ? v : (0, _reduxImmutablejs.combineReducers)(v);
  })));
};

exports.default = combine;
module.exports = exports['default'];