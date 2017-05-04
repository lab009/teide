import React from 'react'
import { Component, PropTypes, connect } from '@lab009/teide'
import { Iterable } from 'immutable'

const defaults = {
  failureRedirectPath: '/login',
  predicate: authData => Iterable.isIterable(authData) && !authData.isEmpty(),
  allowRedirectBack: true,
}

export default (options) => {
  const { authSelector, failureRedirectPath, predicate, allowRedirectBack, redirectAction } = {
    ...defaults,
    ...options,
  }

  const isAuthorized = authData => predicate(authData)

  const ensureAuth = ({ location, authData }, redirect) => {
    let query
    if (allowRedirectBack) {
      query = { redirect: `${location.pathname}${location.search}` }
    } else {
      query = {}
    }

    if (!isAuthorized(authData)) {
      redirect({
        pathname: failureRedirectPath,
        query,
      })
    }
  }

  class AuthComponent extends Component {
    static propTypes = {
      // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
      location: PropTypes.object.isRequired,
      // eslint-disable-next-line react/forbid-prop-types
      authData: PropTypes.object.isRequired,
      children: PropTypes.node.isRequired,
    }

    componentWillMount() {
      ensureAuth(this.props, redirectAction)
    }

    componentWillReceiveProps(nextProps) {
      ensureAuth(nextProps, redirectAction)
    }

    render() {
      const { children, authData } = this.props

      if (isAuthorized(authData)) {
        return React.Children.only(children)
      }
      // Don't need to display anything because the user will be redirected
      return null
    }
  }

  const onEnter = store => (nextState, replace) => {
    const authData = authSelector(store.getState())
    ensureAuth({ location: nextState.location, authData }, replace)
  }

  return {
    component: connect({ authData: authSelector })(AuthComponent),
    onEnter,
  }
}
