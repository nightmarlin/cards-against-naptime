import Vue from 'vue'
import VueWait from 'vue-wait'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './stylus/main.styl'
import vuetify from '@/plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  wait: new VueWait({
    useVuex: true
  }),
  render: h => h(App)
}).$mount('#app')
