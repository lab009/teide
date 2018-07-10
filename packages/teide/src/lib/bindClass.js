export default context =>
  Object.getOwnPropertyNames(context.constructor.prototype)
    .filter(method => typeof context[method] === 'function' && method !== 'constructor')
    .forEach((method) => {
      // eslint-disable-next-line no-param-reassign
      context[method] = context[method].bind(context)
    })
