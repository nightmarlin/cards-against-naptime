const state = {
  unfilteredList: []
}

const mutations = {
  setFilter (state, filter) {
    state.filter = filter
  },
  addServer (state, server) {
    state.unfilteredList = [
      ...state.unfilteredList,
      server
    ]
  },
  setServers (state, servers) {
    state.unfilteredList = servers
  },
  updateServer (state, server) {
  }
}

const actions = {
  handleTopicMessages ({ state, commit, dispatch }, { topic, payload }) {
    if (topic === 'servers') {
      if (payload.action === 'CREATE') {
        commit('addServer', payload.data)
      }
    }
  }
}

const getters = {
  searchedServers (state) {
    return state.unfilteredList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
