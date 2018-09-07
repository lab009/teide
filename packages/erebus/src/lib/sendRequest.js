import request from 'superagent'
import qs from 'qs'

import { REQUEST, FAILURE, SUCCESS } from '../types'
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
        type: FAILURE,
        meta: options,
        payload: error,
      })
      if (options.onError) options.onError(error, response)
      if (options.onFinal) options.onFinal(error, response)
      return reject(error)
    }

    dispatch({
      type: SUCCESS,
      meta: options,
      payload: {
        raw: response.body,
        text: response.text,
        normalized: options.model && entify(response.body, options),
      },
    })
    if (options.onResponse) options.onResponse(response)
    if (options.onFinal) options.onFinal(null, response)
    resolve(response)
  }
}

const sendRequest = async ({ options, dispatch, getState }) => {
  dispatch({
    type: REQUEST,
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
