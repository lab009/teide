'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.isfunction');

var _lodash2 = _interopRequireDefault(_lodash);

var _extendReactClass = require('./css-modules/extendReactClass');

var _extendReactClass2 = _interopRequireDefault(_extendReactClass);

var _wrapStatelessFunction = require('./css-modules/wrapStatelessFunction');

var _wrapStatelessFunction2 = _interopRequireDefault(_wrapStatelessFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isReactComponent = function isReactComponent(maybeReactComponent) {
  return 'prototype' in maybeReactComponent && (0, _lodash2.default)(maybeReactComponent.prototype.render);
};

exports.default = function (styles, options) {
  return function (Component) {
    var decoratedClass = void 0;

    if (isReactComponent(Component)) {
      decoratedClass = (0, _extendReactClass2.default)(Component, styles, options);
    } else {
      decoratedClass = (0, _wrapStatelessFunction2.default)(Component, styles, options);
    }

    decoratedClass.displayName = Component.displayName || Component.name;

    return decoratedClass;
  };
};

module.exports = exports['default'];