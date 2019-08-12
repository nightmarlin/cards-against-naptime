const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { UserError } = require('../utils/errors')
const bcrypt = require('bcrypt')
const PubSub = require('../pubsub')

const schema = new Schema({
  meta: {
    author: {
      type: Schema.Types.ObjectId, ref: 'User'
    },
    accentColor: String,
    decks: [{ type: Schema.Types.ObjectId, ref: 'Deck' }],
    description: {
      type: String,
      maxLength: 128
    },
    maxMemberCount: Number,
    name: {
      type: String,
      maxLength: 32,
      minLength: 4
    },
    passwordHash: String,
    spectators: {
      enabled: Boolean,
      maxSpectatorCount: Number
    }
  },
  state: {
    gameStage: {
      type: String,
      enum: ['LOBBY', 'IN_PLAY', 'COMPLETED']
    }
  }
})

const Server = mongoose.model('Server', schema)

schema.statics.createServer = async function ({ data, user }) {
  if (!user) {
    throw new UserError('must be logged in to create server')
  }

  if (!data.password) {
    throw new UserError('password must be provided')
  }

  const passwordHash = await bcrypt.hash(data.password, 5)

  const newServer = await Server.create({
    meta: {
      author: user._id,
      accentColor: data.accentColor,
      decks: [],
      description: data.description,
      maxMemberCount: 5,
      name: data.name,
      passwordHash,
      spectators: {
        enabled: Boolean,
        maxSpectatorCount: Number
      }
    }
  })

  PubSub.publishTopicUpdate('servers', {
    action: 'CREATE',
    data: newServer
  })
  return newServer
}

module.exports = Server
