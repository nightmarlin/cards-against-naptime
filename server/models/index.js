const config = require('config')
const logger = require('pino')()
const mongoose = require('mongoose')

const CardSet = require('./card-set')
const User = require('./user')

const connect = async () => {
  logger.warn('connecting to mongo')
  await mongoose.connect(config.get('db.connectionString'))
  logger.warn('succesfully connected')
}

module.exports = {
  CardSet,
  User,
  connect
}
