import { mergeOptions } from './createAction'
import sendRequest from './sendRequest'

const noop = () => {}

const createRequest = (defaults = {}) => (opt = {}) => {
  const options = mergeOptions(defaults, opt)

  if (!options.method) throw new Error('Missing method')
  if (!options.endpoint) throw new Error('Missing endpoint')

  return sendRequest({ options, dispatch: noop })
}

export default createRequest
