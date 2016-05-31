import { Children, isValidElement, cloneElement } from 'react';
import classNames from 'classnames/bind';

var linkElement = function linkElement(element, styles, options) {
  var cx = classNames.bind(styles);
  var className = void 0;
  var children = void 0;

  if (isValidElement(element.props.children)) {
    children = linkElement(element.props.children, styles, options);
  } else {
    children = Children.map(element.props.children, function (node) {
      if (isValidElement(node)) {
        return linkElement(node, styles, options);
      }
      return node;
    });
  }

  if (element.props.styleName) {
    className = cx(element.props.styleName);

    if (element.props.className) {
      className = element.props.className + ' ' + className;
    }

    return cloneElement(element, { className: className }, children);
  }

  return element;
};

export default linkElement;