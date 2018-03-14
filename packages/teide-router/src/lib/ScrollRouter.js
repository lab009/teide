import { Router, applyRouterMiddleware } from 'react-router'
import { useScroll } from 'react-router-scroll'

export default class ScrollRouter extends Router {
  // eslint-disable-next-line no-undef
  static defaultProps = {
    render: applyRouterMiddleware(useScroll()),
  }
}
