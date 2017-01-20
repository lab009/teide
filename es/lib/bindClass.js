'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context) {
  return Object.getOwnPropertyNames(context.constructor.prototype).filter(function (method) {
    return typeof context[method] === 'function' && method !== 'constructor';
  }).forEach(function (method) {
    context[method] = context[method].bind(context);
  });
};