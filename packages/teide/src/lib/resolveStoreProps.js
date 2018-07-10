import { map, path } from 'ramda'

// supports array of strings, strings with dot, or function
const lookup = (state, key, args) => {
  if (typeof key === 'function') return key(...args)
  if (typeof key === 'string') return path(key.split('.'), state)
  if (Array.isArray(key)) return path(key, state)

  throw new Error(`Unknown lookup key: ${key}`)
}

// takes an object where key is anything you want
// and value (aka storeProp) is either
// - a dot delimited string
// - array of strings
// - function that returns an array of strings
// it will then dive into an immutable object and grab all of these storeProps
// and return the same object, but where the values are the resolved data
export default (storeProps, storeState, props) =>
  map(value => lookup(storeState, value, [storeState, props]), storeProps)
