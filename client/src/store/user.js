const state = {
  jwt: null,
  username: null
}

const mutations = {
  setLogin (state, { jwt, username }) {
    state.jwt = jwt
    state.username = username
  }
}

const actions = {
  async login ({ commit, dispatch }, payload) {
    const jwt = await dispatch('websocket/rpc', {
      command: 'login',
      params: {
        username: payload.username,
        password: payload.password
      }
    }, { root: true })

    commit('setLogin', {
      jwt,
      username: payload.username
    })
  },
  async register ({ commit, dispatch }, payload) {
    const jwt = await dispatch('websocket/rpc', {
      command: 'register',
      params: {
        username: payload.username,
        password: payload.password
      }
    }, { root: true })

    commit('setLogin', {
      jwt,
      username: payload.username
    })
  }
}

const getters = {
  isLoggedIn (state) {
    return !!state.jwt
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
