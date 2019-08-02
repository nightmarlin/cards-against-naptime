const { User } = require('../models')

module.exports = {
  handler: ctx => {
    return User.login(ctx.params)
  }
}
