import { mergeDeepLeft, mapObjIndexed } from 'ramda'

import sendRequest from './sendRequest'

// TODO: check entities cache in store and dont fetch if we have it already

/*
 app must have redux-thunk installed
 possible options:

 - onError (optional)(function)
 - onResponse (optional)(function)
 - onFinal (optional)(function)
 - onConfig (optional)(function)

 - endpoint (required)(url string)
 - method (required)(get, post, put, delete, or patch)
 - params (object)
 - subset (optional)(string)
 - model (optional)(normalizr model)
 - collection (default false)(boolean)
 - fresh (default to false)(boolean)
 - forceUpdate (default to false)(boolean)

 - headers (optional)(object)
 - query (optional)(object)
 - body (optional)(object)
 - accept (optional)(string)
 - withCredentials (default false)(boolean)

 all options can either be a value, or a function that returns a value.
 if you define a function, it will receive options.params as an argument

merge our multitude of option objects together
 defaults = options defined in createAction
 opt = options specified in action creator
 */

const reserved = ['onResponse', 'onError', 'onFinal', 'onConfig']
const result = (value, ...arg) => (typeof value === 'function' ? value(...arg) : value)
const isReserved = option => reserved.indexOf(option) !== -1
const resolveFunctions = (options, params) => mapObjIndexed(
  (value, option) => {
    if (isReserved(option)) return value
    return result(value, params)
  },
  options
)

export const mergeOptions = (defaults, opt) => {
  const defaultParams = defaults.params ? result(defaults.params) : {}
  const optParams = opt.params ? result(opt.params) : {}
  const params = mergeDeepLeft(optParams, defaultParams)
  return mergeDeepLeft(resolveFunctions(opt, params), resolveFunctions(defaults, params))
}

const createAction = (defaults = {}) => {
  const createRequest = (opt = {}) => {
    const options = mergeOptions(defaults, opt)

    if (!options.method) throw new Error('Missing method')
    if (!options.endpoint) throw new Error('Missing endpoint')

    const action = async (dispatch, getState) => sendRequest({ options, dispatch, getState })
    action.options = options
    return action
  }
  createRequest.options = defaults
  return createRequest
}

export default createAction
