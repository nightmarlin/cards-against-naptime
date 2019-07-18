const express = require('express')
const http = require('http')
const logger = require('pino')()
const socketio = require('socket.io')
const SocketHandler = require('./socket-handler')

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

server.listen(3000, () => logger.warn('server open for connections'))
