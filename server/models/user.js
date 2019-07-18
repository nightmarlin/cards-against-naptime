const config = require('config')
const jsonwebtoken = require('jsonwebtoken')
const mongoose = require('mongoose')

const PASSWORD_SECRET = config.get('secrets.password')
const JWT_SECRET = config.get('secrets.jwt')

const schema = new mongoose.Schema({
  username: String,
  passwordHash: String
})

schema.statics.findFromJWT = async function (jwt) {

}

schema.statics.login = async function (username, passwordHash) {

}

schema.statics.register = async function (username, password) {

}

const User = mongoose.model('User', schema)

module.exports = User
