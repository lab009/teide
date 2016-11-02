
import isFunction from 'lodash.isfunction'

import extendReactClass from './css-modules/extendReactClass'
import wrapStatelessFunction from './css-modules/wrapStatelessFunction'

const isReactComponent = maybeReactComponent =>
  'prototype' in maybeReactComponent && isFunction(maybeReactComponent.prototype.render)

export default (styles, options) => (Component) => {
  let decoratedClass

  if (isReactComponent(Component)) {
    decoratedClass = extendReactClass(Component, styles, options)
  } else {
    decoratedClass = wrapStatelessFunction(Component, styles, options)
  }

  decoratedClass.displayName = Component.displayName || Component.name

  return decoratedClass
}
