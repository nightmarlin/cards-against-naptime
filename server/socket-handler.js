const logger = require('pino')()
const commands = require('./commands')
const jwt = require('jsonwebtoken')
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

    socket.on('rpc', data => this.handleRPC(socket, data))
  }

  async handleRPC (socket, data) {
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

      }

      const command = commands[ctx.command]
      if (!command) {
        throw new Error('command does not exist')
      }

      await command(ctx)
    } catch (e) {
      logger.error(e)
    }
  }
}
