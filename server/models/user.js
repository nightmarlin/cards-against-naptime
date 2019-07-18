const config = require('config')
const mongoose = require('mongoose')
const jsonwebtoken = require('../utils/jsonwebtoken')
const PASSWORD_SECRET = config.get('secrets.password')

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
