import mapValues from 'lodash.mapvalues'
import merge from 'lodash.merge'

const result = (fn, ...arg) => (typeof fn === 'function' ? fn(...arg) : fn)

export const mergeOption = (obj, option) => (...arg) => ({
  ...result(obj, ...arg),
  ...result(option, ...arg),
})
/*
 merge our multitude of option objects together
 defaults = options defined in createAction
 opt = options specified in action creator
 state = current state of store
 */
const mergeOptions = (defaults, opt, state) => mapValues(merge({}, defaults, opt), (v, k, { params = {} }) => result(v, params, state))

export default mergeOptions
