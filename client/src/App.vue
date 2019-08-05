<template>
  <v-app>

    <app-bar @icon-clicked="drawer = !drawer" />

    <nav-drawer /> <!-- TODO: Find a way to bind the app bar @icon-click event to opening this drawer -->

    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>

    <v-footer app>
      &#1488;ightmarlin &amp; Strideynet &copy; 2019
    </v-footer>
  </v-app>
</template>

<script>
import appBar from './components/app/appBar'
import navDrawer from './components/app/navDrawer'

export default {
  name: 'App',
  components: {
    appBar,
    navDrawer
  },
  data () {
    return {
      drawer: false
    }
  },
  mounted () {
    this.$store.dispatch('websocket/connect')
  }
}
</script>
