<template>
  <v-app>

    <app-bar />

    <v-content>
      <v-container grid-list-md fluid >
        <router-view/>
      </v-container>
    </v-content>

    <v-footer app>
      &#1488;ightmarlin &amp; Strideynet &copy; 2019
    </v-footer>
  </v-app>
</template>

<script>
import appBar from './components/appBar'

export default {
  name: 'App',
  components: {
    appBar
  },
  data () {
    return {
      //
    }
  },
  mounted () {
    this.$store.dispatch('websocket/connect')
  }
}
</script>
