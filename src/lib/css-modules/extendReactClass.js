import hoistNonReactStatics from 'hoist-non-react-statics'

import linkElement from './linkElement'

export default (Component, styles, options) => {
  class WrappedComponent extends Component {
    render() {
      const renderResult = super.render()

      if (renderResult) {
        return linkElement(renderResult, styles, options)
      }
      return renderResult
    }
  }

  return hoistNonReactStatics(WrappedComponent, Component)
}
