const config = require('config')
const logger = require('pino')()
const mongoose = require('mongoose')

const Deck = require('./deck')
const User = require('./user')
const Server = require('./server')

const connect = async () => {
  logger.warn('connecting to mongo')
  await mongoose.connect(config.get('db.connectionString'))
  logger.warn('succesfully connected')
}

module.exports = {
  Deck,
  User,
  Server,
  connect
}
