const config = require('config')
const db = require('./models')
const express = require('express')
const http = require('http')
const logger = require('pino')()
const socketio = require('socket.io')
const SocketHandler = require('./socket-handler')

const PORT = config.get('port')

const app = express()
const server = http.Server(app)

const io = socketio(server, {
})

app.get('/', (req, res) => {
  res.send('welcome to the api :)')
})

app.get('/live', (req, res) => {
  res.sendStatus(200)
})

app.get('/ready', (req, res) => {
  res.sendStatus(200)
})

const socketHandler = new SocketHandler(io)

db.connect()
  .catch(err => {
    logger.fatal(err)
    process.exit(1)
  })
  .then(() => {
    server.listen(PORT, () => logger.warn('server open for connections'))
  })
