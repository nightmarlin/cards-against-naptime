import { rpc } from './websocket'

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
    try {
      const jwt = await rpc('login',
        {
          username: payload.username,
          password: payload.password
        })

      commit('setLogin', {
        jwt,
        username: payload.username
      })
    } catch (e) {
      dispatch('ui/handleError', e, { root: true })
    }
  },
  logout ({ commit }) {
    commit('setLogin', { jwt: null, username: null })
  },
  async register ({ commit, dispatch }, payload) {
    try {
      const jwt = await rpc('register',
        {
          username: payload.username,
          password: payload.password
        }
      )

      commit('setLogin', {
        jwt,
        username: payload.username
      })
    } catch (e) {
      dispatch('ui/handleError', e, { root: true })
    }
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
