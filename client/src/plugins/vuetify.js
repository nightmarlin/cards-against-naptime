import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import canLogo from '../components/canLogo'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      canLogo: {
        component: canLogo,
        props: {
          height: 64,
          width: 64
        }
      }
    }
  }
})
