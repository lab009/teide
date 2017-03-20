import request from 'superagent'
import entify from './entify'

const prepareOptions = ({ req, options }) => {
  if (options.headers) {
    req.set(options.headers)
  }
  if (options.field) {
    req.field(options.field)
  }
  if (options.query) {
    req.query(options.query)
  }
  if (options.body) {
    req.send(options.body)
  }
  if (options.withCredentials) {
    req.withCredentials()
  }
  if (options.token) {
    req.set({ Authorization: `Bearer ${options.token}` })
  }
  if (options.locale) {
    req.set({ 'Accept-Language': options.locale })
  }
  if (options.auth) {
    req.auth(...options.auth)
  }
}

const checkResponce = ({ res, options }) => {
  const debug = `${options.method.toUpperCase()} ${options.endpoint}`

  if (!res) {
    throw new Error(`Connection failed: ${debug}`)
  }
  if (!res.noContent && res.type !== 'application/json') {
    throw new Error(`Unknown response type: '${res.type}' from ${debug}`)
  }
}

const sendRequest = ({ options, dispatch }) => {
  dispatch({
    type: 'erebus.request',
    payload: options,
  })

  const req = request[options.method.toLowerCase()](options.endpoint)
  prepareOptions({ req, options })

  return req
    .then((res) => {
      checkResponce({ res, options })
      return res
    })
    .then((res) => {
      dispatch({
        type: 'erebus.success',
        meta: options,
        payload: {
          raw: res.body,
          normalized: options.model && entify(res.body, options),
        },
      })
      return res
    })
    .catch((err) => {
      dispatch({
        type: 'erebus.failure',
        meta: options,
        payload: err,
      })
      throw err
    })
}

export default sendRequest
