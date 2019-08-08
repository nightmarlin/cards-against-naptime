const state = {
  unfilteredList: []
}

const mutations = {
  setFilter (state, filter) {
    state.filter = filter
  }
}

const actions = {
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
