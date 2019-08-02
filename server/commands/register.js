const { User } = require('../models')

module.exports = {
  handler: ctx => {
    return User.register(ctx.params)
  }
}
