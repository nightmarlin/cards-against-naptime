class UserError extends Error {
  constructor (...args) {
    super(...args)
    Error.captureStackTrace(this, UserError)
  }
}

class ServerError extends Error {
  constructor (...args) {
    super(...args)
    Error.captureStackTrace(this, ServerError)
  }
}

module.exports = {
  UserError,
  ServerError
}
