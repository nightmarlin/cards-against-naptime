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
  async login ({ commit }, payload) {

  },
  async register ({ commit }, payload) {

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
