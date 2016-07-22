import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import hoistNonReactStatics from 'hoist-non-react-statics';

import linkElement from './linkElement';

export default (function (Component, styles, options) {
  var WrappedComponent = function (_Component) {
    _inherits(WrappedComponent, _Component);

    function WrappedComponent() {
      _classCallCheck(this, WrappedComponent);

      return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    WrappedComponent.prototype.render = function render() {
      var renderResult = _Component.prototype.render.call(this);

      if (renderResult) {
        return linkElement(renderResult, styles, options);
      }
      return renderResult;
    };

    return WrappedComponent;
  }(Component);

  return hoistNonReactStatics(WrappedComponent, Component);
});