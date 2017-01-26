'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _reduxActions = require('redux-actions');

var _lodash = require('lodash.reduce');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createReducerActions = function createReducerActions(o, ns) {
  if ((typeof o === 'undefined' ? 'undefined' : _typeof(o)) !== 'object') {
    throw new Error('Passed an invalid reducer config - must be an object');
  }
  return (0, _lodash2.default)(o, function (prev, v, k) {
    if (k === 'initialState') return prev;
    var name = ns ? ns + '.' + k : k;

    if (typeof v === 'function') {
      prev[k] = (0, _reduxActions.createAction)(name);
      return prev;
    }

    if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
      prev[k] = createReducerActions(v, name);
      return prev;
    }

    return prev;
  }, {});
};

exports.default = createReducerActions;