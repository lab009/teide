import { createRouteFromReactElement } from 'react-router/lib/RouteUtils'
import invariant from 'invariant'
import { Component, PropTypes } from '@lab009/teide'

import createAuthComponent from './createAuthComponent'

export default class Auth extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    options: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    store: PropTypes.object.isRequired,
  }

  static createRouteFromReactElement(element) {
    const route = createRouteFromReactElement(element)
    const { options, store } = route
    const { component, onEnter } = createAuthComponent(options)

    return {
      ...route,
      component,
      onEnter: onEnter(store),
    }
  }

  render() {
    invariant(false, '<Auth> elements are for router configuration only and should not be rendered')
    return null
  }
}
