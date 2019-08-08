const state = {
  unfilteredList: [],
  filter: {
    advanced: false,
    gameName: '',
    includeFull: false, // Show games that are full
    includeSpectate: true, // Show games that are full but have empty spectator slots
    includePassword: true, // Show games that require a password
    searchByDecks: false, // Change the search criteria to deck names
    deckNames: [],
    searchByAuthor: false, // Change the search criteria to game author names
    authorName: ''
  }
}

const mutations = {
  setFilter (state, filter) {
    state.filter = filter
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
  }
}

const getters = {
  searchedServers (state) {
    return = []
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
