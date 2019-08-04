<template>
  <v-app>
    <v-app-bar app>
      <v-icon color="primary">mdi-sleep-off</v-icon>
      <v-spacer />
      <v-toolbar-title class="headline text-uppercase" v-show="$vuetify.breakpoint.smAndUp">
        <span>CARDS </span>
        <span class="font-weight-light">Against Naptime</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        color="primary"
        text
        href="https://github.com/Nightmarlin/cards-against-naptime"
        target="_blank"
        v-show="$vuetify.breakpoint.mdAndUp"
      >
        <span class="mr-2">Check out the repo</span>
        <v-icon>mdi-github-box</v-icon>
      </v-btn>
    </v-app-bar>

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

export default {
  name: 'App',
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
