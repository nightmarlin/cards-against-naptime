<template>
  <v-app-bar dark app>
    <!--div>
      <can-logo
        :width="48"
        :height="48"
      />
    </div-->
    <v-btn fab small><v-icon @click="iconClick">$vuetify.icons.canLogo</v-icon></v-btn>
    <v-spacer />
    <v-toolbar-title class="headline text-uppercase" v-show="$vuetify.breakpoint.smAndUp">
      <span>CARDS </span>
      <span class="font-weight-light">Against Naptime</span>
    </v-toolbar-title>
    <v-spacer />
      <v-btn
        @click="logout"
        color="primary"
        text
        v-show="isLoggedIn"
        transition="fade-transition"
      ><span v-show="$vuetify.breakpoint.mdAndUp">Hello {{ loggedInUsername }}. Click here to&nbsp;</span>log out</v-btn>
      <v-btn
        color="primary"
        text
        href="https://github.com/Nightmarlin/cards-against-naptime"
        target="_blank"
        transition="fade-transition"
        v-show="($vuetify.breakpoint.mdAndUp && !isLoggedIn)"
      >
        <span class="mr-2">Check out the repo</span>
        <v-icon>mdi-github-circle</v-icon>
      </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// import canLogo from './canLogo'

export default {
  name: 'appBar',
  components: {
    // canLogo
  },
  computed: {
    ...mapState({
      loggedInUsername: state => state.user.username
    }),
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    })
  },
  data () {
    return { }
  },
  methods: {
    logout: function () {
      this.isLoggedIn = false
    },
    iconClick: function () {
      this.$emit('icon-clicked')
    }
  },
  props: { }
}
</script>
