import linkElement from './linkElement'

export default (reactComponent, styles, options) => {
  const WrappedComponent = (props = {}, ...args) => {
    const renderResult = reactComponent(props, ...args)

    if (renderResult) {
      return linkElement(renderResult, styles, options)
    }
    return renderResult
  }

  return WrappedComponent
}
