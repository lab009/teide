import mergeOptions from './mergeOptions'
import sendRequest from './sendRequest'

// TODO: check entities cache in store and dont fetch if we have it already

/*
 app must have redux-thunk installed
 possible options:

 - method (required)(get, post, put, delete, or patch)
 - endpoint (required)(url string)
 - subset (optional)(string)
 - params (object)
 - model (optional)(normalizr model)
 - collection (default false)(boolean)
 - fresh (default to false)(boolean)

 - headers (optional)(object)
 - field (optional)(object)
 - query (optional)(object)
 - body (optional)(object)
 - withCredentials (default false)(boolean)
 - auth (optional)(array)
 - type (optional)(string)


 all options can either be a value, or a function that returns a value.
 if you define a function, it will receive options.params as an argument
 */

const createRequest = (defaults = {}) => (opt = {}) => {
  const options = mergeOptions(defaults, opt)

  if (!options.method) throw new Error('Missing method')
  if (!options.endpoint) throw new Error('Missing endpoint')

  const reqPromise = sendRequest(options)
  reqPromise.catch(() => {})

  return reqPromise
}

export default createRequest
