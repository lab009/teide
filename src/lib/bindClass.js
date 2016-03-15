export default (context) =>
  Object.getOwnPropertyNames(context.constructor.prototype)
    .filter((method) => typeof context[method] === 'function' && method !== 'constructor')
    .forEach((method) => context[method] = context[method].bind(context))
