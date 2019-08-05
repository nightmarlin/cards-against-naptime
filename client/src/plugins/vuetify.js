import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import canLogo from '../components/app/canLogo'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
    values: {
      canLogo: {
        component: canLogo,
        props: {
          height: 128,
          width: 128
        }
      }
    }
  }
})
