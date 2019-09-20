const state = {
  notifs: []
  // notif : { id: Number, message: String, title: String, type: String, timeout: Number }
}

const mutations = {
  addNotif (state, notif) {
    state.notifs = [...state.notifs, notif]
  },
  removeNotif (state, id) {
    state.notifs = state.notifs.filter(n => n.id !== id)
  }
}

const actions = {
  async handleError ({ commit }, error) {
    const notif = {
      id: Date.now(),
      message: error.message,
      timeout: 5000,
      title: 'ERROR:',
      type: 'error'
    }

    commit('addNotif', notif)
  },

  async removeNotif ({ commit }, id) {
    commit('removeNotif', id)
  }
}

const getters = { }

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
