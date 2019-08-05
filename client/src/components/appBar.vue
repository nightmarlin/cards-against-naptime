<template>

    <v-app-bar dark app>
      <can-logo width="48" height="48"/>
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

</template>

<script>
import canLogo from './canLogo'

export default {
  name: 'appBar',
  components: {
    canLogo
  },
  data () { return { } }
}
</script>
