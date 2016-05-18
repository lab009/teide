import linkElement from './linkElement'

export default (Component, styles, options) => {
  const WrappedComponent = (props = {}, ...args) => {
    const renderResult = Component(props, ...args)

    if (renderResult) {
      return linkElement(renderResult, styles, options)
    }
    return renderResult
  }

  return WrappedComponent
}
