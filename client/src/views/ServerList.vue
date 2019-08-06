<template>
<!--

  So the plan is simple: have a grid list display a list of servers

-->
<div>
  <search-bar />
  <v-container grid-list-lg>
    <v-layout wrap>
      <v-flex
        xs12 sm6 md4
        v-for="(server, i) in availableServers"
        :key="'server-' + i"
      >
      <serverlist-item
        :server="server"
      />
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import searchBar from '../components/serverlist/SearchBar'
import serverlistItem from '../components/serverlist/ServerListItem'
const I18N = require('../i18n/en.json')
const servers = require('./testServers.json')

export default {
  components: {
    searchBar,
    serverlistItem
  },
  data () {
    return {
      availableServers: null,
      i18n: I18N
    }
  },
  mounted: function () {
    this.availableServers = servers // Done like this so ESLint doesn't ree at unused vars
  }
}
</script>
