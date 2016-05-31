import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component as ReactComponent, PropTypes as RPropTypes } from 'react';
import { Provider } from 'react-redux';
import IPropTypes from 'react-immutable-proptypes';
import bindClass from './lib/bindClass';
import connect from './lib/connect';
import createStore from './createStore';
import createActions from './lib/createActions';
import createReducer from './lib/createReducer';
import createReducerActions from './lib/createReducerActions';
import combineReducers from './lib/combineReducers';
import CSSModules from './lib/CSSModules';

var TangoComponent = function (_ReactComponent) {
  _inherits(TangoComponent, _ReactComponent);

  function TangoComponent() {
    _classCallCheck(this, TangoComponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _ReactComponent.call.apply(_ReactComponent, [this].concat(args)));

    _this.state = _extends({}, _this.constructor.defaultState, _this.state);
    bindClass(_this);
    return _this;
  }

  return TangoComponent;
}(ReactComponent);

TangoComponent.defaultState = {};


var PropTypes = _extends({}, IPropTypes, RPropTypes);

export { TangoComponent as Component, connect, CSSModules, PropTypes, Provider, combineReducers, createReducer, createReducerActions, createActions, createStore };