import _extends from 'babel-runtime/helpers/extends';
import { connect } from 'react-redux';
import resolve from './resolveStoreProps';

var mapStateToProps = function mapStateToProps(storeProps) {
  return function (storeState, ownProps) {
    return resolve(storeProps, storeState, ownProps);
  };
};

var defaults = {
  pure: true,
  withRef: false
};

export default (function (storeProps, options) {
  var connector = connect(storeProps ? mapStateToProps(storeProps) : null, null, null, _extends({}, defaults, options));
  return function (Component) {
    Component.storeProps = storeProps;
    return connector(Component);
  };
});