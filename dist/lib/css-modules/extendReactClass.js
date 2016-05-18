'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _linkElement = require('./linkElement');

var _linkElement2 = _interopRequireDefault(_linkElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Component, styles, options) {
  var WrappedComponent = function (_Component) {
    (0, _inherits3.default)(WrappedComponent, _Component);

    function WrappedComponent() {
      (0, _classCallCheck3.default)(this, WrappedComponent);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(WrappedComponent).apply(this, arguments));
    }

    (0, _createClass3.default)(WrappedComponent, [{
      key: 'render',
      value: function render() {
        var renderResult = (0, _get3.default)((0, _getPrototypeOf2.default)(WrappedComponent.prototype), 'render', this).call(this);

        if (renderResult) {
          return (0, _linkElement2.default)(renderResult, styles, options);
        }
        return renderResult;
      }
    }]);
    return WrappedComponent;
  }(Component);

  return (0, _hoistNonReactStatics2.default)(WrappedComponent, Component);
};

module.exports = exports['default'];