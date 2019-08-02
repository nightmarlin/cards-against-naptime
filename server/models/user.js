const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jsonwebtoken = require('../utils/jsonwebtoken')
const { UserError } = require('../utils/errors')

const schema = new mongoose.Schema({
  username: String,
  passwordHash: String
})

schema.methods.createJWT = function () {
  return jsonwebtoken.sign({
    id: this._id,
    username: this.username
  })
}

schema.statics.findFromJWT = async function (jwt) {
  const decoded = await jsonwebtoken.verify(jwt)

  if (!decoded._id) {
    throw new Error('corrupt jwt')
  }

  return this.findById(decoded._id)
}

schema.statics.login = async function (data) {
  if (!data.username || !data.password) {
    throw new UserError('missing user or password field')
  }

  const user = await this.findOne({
    username: data.username
  })

  if (!user) {
    throw new UserError('no such user with specified username')
  }

  const passwordMatch = await bcrypt.compare(data.password, user.passwordHash)

  if (!passwordMatch) {
    throw new UserError('incorrect password for user')
  }

  return user.createJWT()
}

schema.statics.register = async function (data) {
  if (!data.username || !data.password) {
    throw new UserError('missing user or password field')
  }

  const usernameInUse = this.exists({
    username: data.username
  })

  if (usernameInUse) {
    throw new UserError('username already in use')
  }

  const passwordHash = await bcrypt.hash(data.password, 5)

  const newUser = await User.create({
    username: data.username,
    passwordHash
  })

  return newUser.createJWT()
}

const User = mongoose.model('User', schema)

module.exports = User
