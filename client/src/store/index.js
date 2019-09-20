import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import { plugin as websocketPlugin } from './websocket'
import server from './server'
import ui from './ui'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    server,
    ui
  },
  plugins: [websocketPlugin]
})
