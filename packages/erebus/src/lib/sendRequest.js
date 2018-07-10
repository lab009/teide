import request from 'superagent'
import qs from 'qs'

import entify from './entify'

const createResponseHandler = ({ options, dispatch, reject, resolve }) => {
  const debug = `${options.method.toUpperCase()} ${options.endpoint}`
  return (error, response) => {
    if (!response && !error) {
      error = new Error(`Connection failed: ${debug}`)
    }
    if (error) {
      error.response = response
      dispatch({
        type: 'erebus.failure',
        meta: options,
        payload: error,
      })
      if (options.onError) options.onError(error, response)
      return reject(error)
    }

    dispatch({
      type: 'erebus.success',
      meta: options,
      payload: {
        raw: response.body,
        text: response.text,
        normalized: options.model && entify(response.body, options),
      },
    })
    if (options.onResponse) options.onResponse(response)
    resolve(response)
  }
}

const sendRequest = async ({ options, dispatch, getState }) => {
  dispatch({
    type: 'erebus.request',
    payload: options,
  })

  const req = request[options.method.toLowerCase()](options.endpoint)
  if (options.headers) {
    req.set(options.headers)
  }
  if (options.query) {
    req.query(typeof options.query === 'string'
      ? options.query
      : qs.stringify(options.query, { strictNullHandling: true }))
  }
  if (options.body) {
    req.send(options.body)
  }
  if (options.accept) {
    req.accept(options.accept)
  }
  if (options.withCredentials) {
    req.withCredentials()
  }
  if (options.onConfig) {
    options.onConfig(req, { getState, options })
  }

  return new Promise((resolve, reject) => {
    req.end(createResponseHandler({
      options,
      dispatch,
      reject,
      resolve,
    }))
  })
}

export default sendRequest
