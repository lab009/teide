
import isFunction from 'lodash.isfunction';

import extendReactClass from './css-modules/extendReactClass';
import wrapStatelessFunction from './css-modules/wrapStatelessFunction';

var isReactComponent = function isReactComponent(maybeReactComponent) {
  return 'prototype' in maybeReactComponent && isFunction(maybeReactComponent.prototype.render);
};

export default (function (styles, options) {
  return function (Component) {
    var decoratedClass = void 0;

    if (isReactComponent(Component)) {
      decoratedClass = extendReactClass(Component, styles, options);
    } else {
      decoratedClass = wrapStatelessFunction(Component, styles, options);
    }

    decoratedClass.displayName = Component.displayName || Component.name;

    return decoratedClass;
  };
});