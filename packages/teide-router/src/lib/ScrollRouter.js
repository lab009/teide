import { Router, applyRouterMiddleware } from 'react-router'
import { useScroll } from 'react-router-scroll'

export default class ScrollRouter extends Router {
  static defaultProps = {
    render: applyRouterMiddleware(useScroll()),
  }
}
