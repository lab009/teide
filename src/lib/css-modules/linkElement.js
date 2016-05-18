import { Children, isValidElement, cloneElement } from 'react'
import classNames from 'classnames/bind'

const linkElement = (element, styles, options) => {
  const cx = classNames.bind(styles)
  let className
  let children

  if (isValidElement(element.props.children)) {
    children = linkElement(element.props.children, styles, options)
  } else {
    children = Children.map(element.props.children, (node) => {
      if (isValidElement(node)) {
        return linkElement(node, styles, options)
      }
      return node
    })
  }

  if (element.props.styleName) {
    className = cx(element.props.styleName)

    if (element.props.className) {
      className = `${element.props.className} ${className}`
    }

    return cloneElement(element, { className }, children)
  }

  return element
}

export default linkElement
