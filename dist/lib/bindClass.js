'use strict';

exports.__esModule = true;

var _getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names');

var _getOwnPropertyNames2 = _interopRequireDefault(_getOwnPropertyNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (context) {
  return (0, _getOwnPropertyNames2.default)(context.constructor.prototype).filter(function (method) {
    return typeof context[method] === 'function' && method !== 'constructor';
  }).forEach(function (method) {
    context[method] = context[method].bind(context);
  });
};

module.exports = exports['default'];