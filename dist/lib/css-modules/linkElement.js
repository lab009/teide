'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _bind = require('classnames/bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var linkElement = function linkElement(element, styles, options) {
  var cx = _bind2.default.bind(styles);
  var className = void 0;
  var children = void 0;

  if ((0, _react.isValidElement)(element.props.children)) {
    children = linkElement(element.props.children, styles, options);
  } else {
    children = _react.Children.map(element.props.children, function (node) {
      if ((0, _react.isValidElement)(node)) {
        return linkElement(node, styles, options);
      }
      return node;
    });
  }

  if (element.props.styleName) {
    className = cx(element.props.styleName);

    if (element.props.className) {
      className = element.props.className + ' ' + className;
    }

    return (0, _react.cloneElement)(element, { className: className }, children);
  }

  return element;
};

exports.default = linkElement;
module.exports = exports['default'];