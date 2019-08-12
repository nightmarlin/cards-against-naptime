let io = null

function publishTopicUpdate (topic, payload) {
  io.to('pubsub/' + topic).emit('topicUpdate', {
    topic,
    payload
  })
}

module.exports = {
  publishTopicUpdate,
  setup (providedIo) {
    io = providedIo
  }
}
