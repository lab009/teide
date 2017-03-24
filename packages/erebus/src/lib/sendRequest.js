import superagent from 'superagent'

const prepareOptions = ({ req, options }) => {
  if (options.type) {
    req.type(options.type)
  }
  if (options.accept) {
    req.accept(options.accept)
  }
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

const sendRequest = (options) => {
  const req = superagent[options.method.toLowerCase()](options.endpoint)
  prepareOptions({ req, options })

  return req.then((res) => {
    checkResponce({ res, options })
    return res
  })
}

export default sendRequest
