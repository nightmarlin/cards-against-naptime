import Socket from 'socket.io-client'

let socket = null
let connectedStatus = null
const subscriptions = {
  'announcements': 'ui/handleTopicMessages',
  'servers': 'server/handleTopicMessages'
}

let store = null

export function connect () {
  socket = new Socket('localhost:3000')

  socket.on('connect', () => {
    connectedStatus = true
  })

  socket.on('disconnect', () => {
    connectedStatus = false
  })

  socket.on('topicUpdate', msg => {
    if (subscriptions[msg.topic]) {
      store.dispatch(subscriptions[msg.topic], msg)
    }
  })
}

export function rpc (command, params) {
  if (connectedStatus) {
    return new Promise((resolve, reject) => {
      socket.emit('rpc', {
        command,
        params
      }, data => {
        if (data.status === 'SUCCESS') {
          resolve(data.result)
        } else {
          reject(data.reason)
        }
      })
    })
  }
}

export function subscribe ({ topic, handlerAction }) {
  if (connectedStatus) {
    subscriptions[topic] = handlerAction
    socket.join('pubsub/' + topic)
  }
}

export function plugin (providedStore) {
  store = providedStore
}
