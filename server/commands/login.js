const { User } = require('../models')

module.exports = {
  handler: async ctx => {
    return User.login(ctx.params)
  }
}
