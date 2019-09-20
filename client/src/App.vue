<template>
  <v-app>

    <app-bar @icon-clicked="drawer = !drawer" />

    <nav-drawer /> <!-- TODO: Find a way to bind the app bar @icon-click event to opening this drawer -->

    <v-content>
      <v-container fluid>
        <router-view/>
        <notif-viewer />
      </v-container>
    </v-content>

    <v-footer app>
      &#1488;ightmarlin &amp; Strideynet &copy; 2019
    </v-footer>
  </v-app>
</template>

<script>
import { connect as websocketConnect } from './store/websocket'
import appBar from './components/app/AppBar'
import navDrawer from './components/app/NavDrawer'
import NotifViewer from './components/app/NotifViewer'

export default {
  name: 'App',
  components: {
    appBar,
    navDrawer,
    NotifViewer
  },
  data () {
    return {
      drawer: false
    }
  },
  mounted () {
    websocketConnect()
  }
}
</script>
