'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = exports.createActions = exports.createReducerActions = exports.createReducer = exports.combineReducers = exports.Provider = exports.PropTypes = exports.connect = exports.Component = undefined;

var _react = require('react');

var _reactRedux = require('react-redux');

var _reactImmutableProptypes = require('react-immutable-proptypes');

var _reactImmutableProptypes2 = _interopRequireDefault(_reactImmutableProptypes);

var _bindClass = require('./lib/bindClass');

var _bindClass2 = _interopRequireDefault(_bindClass);

var _connect = require('./lib/connect');

var _connect2 = _interopRequireDefault(_connect);

var _createStore = require('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _createActions = require('./lib/createActions');

var _createActions2 = _interopRequireDefault(_createActions);

var _createReducer = require('./lib/createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

var _createReducerActions = require('./lib/createReducerActions');

var _createReducerActions2 = _interopRequireDefault(_createReducerActions);

var _combineReducers = require('./lib/combineReducers');

var _combineReducers2 = _interopRequireDefault(_combineReducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TeideComponent = function (_ReactComponent) {
  _inherits(TeideComponent, _ReactComponent);

  function TeideComponent() {
    var _ref;

    _classCallCheck(this, TeideComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = TeideComponent.__proto__ || Object.getPrototypeOf(TeideComponent)).call.apply(_ref, [this].concat(args)));

    _this.state = Object.assign({}, _this.constructor.defaultState, _this.state);
    (0, _bindClass2.default)(_this);
    return _this;
  }

  return TeideComponent;
}(_react.Component);

TeideComponent.defaultState = {};


var PropTypes = Object.assign({}, _reactImmutableProptypes2.default, _react.PropTypes);

exports.Component = TeideComponent;
exports.connect = _connect2.default;
exports.PropTypes = PropTypes;
exports.Provider = _reactRedux.Provider;
exports.combineReducers = _combineReducers2.default;
exports.createReducer = _createReducer2.default;
exports.createReducerActions = _createReducerActions2.default;
exports.createActions = _createActions2.default;
exports.createStore = _createStore2.default;