import { pipe, toPairs, reduce } from 'ramda'

const processPlugins = pipe(
  toPairs,
reduce((acc, [name, plugin]) => {
  if (typeof plugin !== 'object') {
    throw new Error(`Invalid export plugin ${name}`)
  }

  // grab the reducer out of it
  if (typeof plugin.reducer === 'function') {
    acc.reducers.push(plugin.reducer)
  } else if (typeof plugin.reducer !== 'undefined') {
    throw new Error(`Invalid "reducer" export in plugin ${name}`)
  }

  if (Array.isArray(plugin.reducers)) {
    acc.reducers = acc.reducers.concat(plugin.reducers)
  } else if (typeof plugin.reducers === 'object') {
    acc.reducers.push(plugin.reducers)
  }

  // grab any middleware
  if (typeof plugin.middleware === 'function') {
    acc.middleware.push(plugin.middleware)
  } else if (Array.isArray(plugin.middleware)) {
    acc.middleware = acc.middleware.concat(plugin.middleware)
  } else if (typeof plugin.middleware !== 'undefined') {
    throw new Error(`Invalid "middleware" export in plugin ${name}`)
  }

  // grab any enhancers
  if (typeof plugin.enhancer === 'function') {
    acc.enhancers.push(plugin.enhancer)
  } else if (typeof plugin.enhancer !== 'undefined') {
    throw new Error(`Invalid "enhancer" export in plugin ${name}`)
  }
  if (Array.isArray(plugin.enhancers)) {
    acc.enhancers = acc.enhancers.concat(plugin.enhancers)
  } else if (typeof plugin.enhancers !== 'undefined') {
    throw new Error(`Invalid "enhancers" export in plugin ${name}`)
  }

  // grab any hooks
  if (typeof plugin.hook === 'function') {
    acc.hooks.push(plugin.hook)
  } else if (typeof plugin.hook !== 'undefined') {
    throw new Error(`Invalid "hook" export in plugin ${name}`)
  }
  if (Array.isArray(plugin.hooks)) {
    acc.hooks = acc.enhancers.concat(plugin.hooks)
  } else if (typeof plugin.hooks !== 'undefined') {
    throw new Error(`Invalid "hooks" export in plugin ${name}`)
  }

  return acc
},
  {
    reducers: [],
    middleware: [],
    enhancers: [],
    hooks: [],
  }
)
)

export default processPlugins
