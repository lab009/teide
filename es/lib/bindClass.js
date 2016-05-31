import _Object$getOwnPropertyNames from 'babel-runtime/core-js/object/get-own-property-names';
export default (function (context) {
  return _Object$getOwnPropertyNames(context.constructor.prototype).filter(function (method) {
    return typeof context[method] === 'function' && method !== 'constructor';
  }).forEach(function (method) {
    context[method] = context[method].bind(context);
  });
})