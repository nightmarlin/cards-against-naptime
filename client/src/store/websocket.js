import Socket from 'socket.io-client'

let socket = null
const state = {
  connected: false
}

const mutations = {
  markConnectionStatus (state, status) {
    state.connected = status
  }
}

const actions = {
  connect ({ commit }) {
    socket = new Socket('localhost:3000')

    socket.on('connect', () => {
      commit('markConnectionStatus', true)
    })

    socket.on('disconnect', () => {
      commit('markConnectionStatus', false)
    })
  },
  async rpc ({ commit, state }, { command, params }) {
    if (state.connected) {
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
}

export default {
  mutations,
  state,
  actions,
  namespaced: true
}
