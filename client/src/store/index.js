import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import websocket from './websocket'
import server from './server'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    websocket,
    server
  }
})
