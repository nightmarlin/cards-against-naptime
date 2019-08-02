const logger = require('pino')()
const commands = require('./commands')
const { User } = require('./models')
/**
 * messageFormat:
 *  command: ''
 *  jwt: ''
 *  params: {}
 */

module.exports = class SocketHandler {
  constructor (io) {
    this.io = io
    this.connectionCount = 0

    this.io.on('connection', this.handleConnection)
  }

  async handleConnection (socket) {
    this.connectionCount++
    logger.info(`client connect. connection count: ${this.connectionCount}`)

    socket.on('disconnect', () => {
      this.connectionCount--
      logger.info(`client disconnect. connection count: ${this.connectionCount}`)
    })

    socket.on('rpc', (data, reply) => this.handleRPC(socket, data, reply))
  }

  async handleRPC (socket, data, reply) {
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

      const result = await command(ctx)

      reply({
        state: 'SUCCESS',
        result
      })
    } catch (e) {
      logger.error(e)
      reply({
        state: 'ERROR',
        reason: e
      })
    }
  }
}
