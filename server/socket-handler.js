const logger = require('pino')()
const commands = require('./commands')
const { User } = require('./models')

let connectionCount = 0
const handleConnection = async (socket) => {
  connectionCount += 1
  logger.info(`client connect. connection count: ${connectionCount}`)

  socket.on('disconnect', () => {
    connectionCount -= 1
    logger.info(`client disconnect. connection count: ${connectionCount}`)
  })

  socket.on('rpc', (data, reply) => {
    logger.info('message recieved %O', data)
    handleRPC(socket, data, reply)
  })
}

const handleRPC = async (socket, data, reply) => {
  try {
    const ctx = {
      command: data.command,
      params: data.params,
      socket: socket,
      jwt: data.jwt,
      user: null
    }

    if (!ctx.command || !ctx.params) {
      throw new Error('malformed rpc message')
    }

    if (ctx.jwt) {
      ctx.user = await User.findFromJWT(ctx.jwt)
    }

    const command = commands[ctx.command]
    if (!command) {
      throw new Error('command does not exist')
    }

    const result = await command.handler(ctx)

    reply({
      status: 'SUCCESS',
      result
    })
  } catch (e) {
    logger.error(e)
    reply({
      status: 'ERROR',
      reason: {
        message: e.message,
        stack: e.stack
      }
    })
  }
}

module.exports = {
  setup (io) {
    this.io = io
    this.io.on('connection', handleConnection)
  }
}
