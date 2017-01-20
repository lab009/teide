'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = exports.createActions = exports.createReducerActions = exports.createReducer = exports.combineReducers = exports.Provider = exports.PropTypes = exports.connect = exports.Component = undefined;

var _classCallCheck2 = require('C:\\cygwin64\\home\\o.orlov\\projects\\teide\\node_modules\\babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('C:\\cygwin64\\home\\o.orlov\\projects\\teide\\node_modules\\babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('C:\\cygwin64\\home\\o.orlov\\projects\\teide\\node_modules\\babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var TeideComponent = function (_ReactComponent) {
  (0, _inherits3.default)(TeideComponent, _ReactComponent);

  function TeideComponent() {
    var _ref;

    (0, _classCallCheck3.default)(this, TeideComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = TeideComponent.__proto__ || Object.getPrototypeOf(TeideComponent)).call.apply(_ref, [this].concat(args)));

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