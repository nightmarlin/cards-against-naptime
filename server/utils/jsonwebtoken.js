const jsonwebtoken = require('jsonwebtoken')
const config = require('config')

const JWT_SECRET = config.get('secrets.jwt')

module.exports = {
  verify: jwt => {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(jwt, JWT_SECRET, (err, decoded) => {
        if (err) {
          return reject(err)
        }

        resolve(decoded)
      })
    })
  },
  sign: payload => {
    return new Promise((resolve, reject) => {
      jsonwebtoken.sign(payload, JWT_SECRET, (err, signed) => {
        if (err) {
          return reject(err)
        }

        resolve(signed)
      })
    })
  }
}
