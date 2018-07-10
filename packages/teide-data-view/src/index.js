import { Component } from '@lab009/teide'
import { isEmpty } from 'ramda'

export default class DataComponent extends Component {
  constructor(...args) {
    super(...args)
    if (!this.constructor.storeProps) {
      throw new Error('DataComponent requires storeProps to be defined! Did you forget to use the connect decorator?')
    }
  }

  componentDidMount() {
    this.tryResolveData()
  }

  componentDidUpdate() {
    if (!this.handleResolved) return
    if (this._resolved) return
    const loading = this.getResolvingFields()
    if (loading.size !== 0) return

    this._resolved = true
    this.handleResolved(this.getResolvedData())
  }

  getResolvingFields() {
    // has keys that are either undefined or have a pending = true key
    return Object.keys(this.constructor.storeProps).reduce((fields, prop) => (
      this.isPropResolving(prop) ? [...fields, prop] : fields), []
    )
  }

  getErrors() {
    // has keys that have an error = data key
    return Object.keys(this.constructor.storeProps).reduce(
      (errors, prop) => (
        this.isPropErrored(prop) ? { ...errors, [prop]: this.props[prop].error } : errors
      ),
      {}
    )
  }

  // eslint-disable-next-line class-methods-use-this
  getData(value) {
    return value.data ? value.data || value : value
  }

  getResolvedData() {
    return Object.keys(this.constructor.storeProps).reduce((prev, prop) => {
      const val = this.props[prop]
      if (!this.isPropResolving(prop)) {
        prev[prop] = this.getData(val)
      }
      return prev
    }, {})
  }

  tryResolveData() {
    if (!this.resolveData) return
    const loading = this.getResolvingFields()
    if (loading.size === 0) return
    this.resolveData()
  }

  isPropResolving(prop) {
    return typeof this.props[prop] === 'undefined' || (this.props[prop].pending && this.props[prop].pending === true)
  }

  isPropErrored(prop) {
    return this.props[prop] != null && this.props[prop].error && this.props[prop].error != null
  }

  isResolving() {
    return !this.isErrored() && !isEmpty(this.getResolvingFields())
  }

  isErrored() {
    return !isEmpty(this.getErrors())
  }

  // eslint-disable-next-line class-methods-use-this
  renderLoader() {
    return null
  }

  // eslint-disable-next-line class-methods-use-this
  renderErrors() {
    return null
  }

  // eslint-disable-next-line class-methods-use-this
  renderData() {
    return null
  }

  render() {
    let node = null

    if (this.isResolving()) {
      node = this.renderLoader(this.getResolvingFields())
    } else if (this.isErrored()) {
      node = this.renderErrors(this.getErrors())
    } else {
      node = this.renderData(this.getResolvedData())
    }

    return node
  }
}
