'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.mapvalues');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// supports array of strings, strings with dot, or function
var lookup = function lookup(o, k, args) {
  if (typeof k === 'function') return k.apply(undefined, _toConsumableArray(args));
  if (typeof k === 'string') return o.getIn(k.split('.'));
  if (Array.isArray(k)) return o.getIn(k);
  throw new Error('Unknown lookup key: ' + k);
};

// takes an object where key is anything you want
// and value (aka storeProp) is either
// - a dot delimited string
// - array of strings
// - function that returns an array of strings
// it will then dive into an immutable object and grab all of these storeProps
// and return the same object, but where the values are the resolved data

exports.default = function (storeProps, storeState, props) {
  return (0, _lodash2.default)(storeProps, function (v) {
    return lookup(storeState, v, [storeState, props]);
  });
};