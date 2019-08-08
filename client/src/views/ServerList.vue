<template>
<!--

  So the plan is simple: have a grid list display a list of servers

-->
<div>
  <search-bar v-model="filter" />
  <v-container grid-list-lg>
    <v-layout wrap>
      <v-flex
        xs12 sm6 md4
        v-for="(server, i) in filteredServers"
        :key="'server-' + i"
      >
      <server-list-item
        :server="server"
      />
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import SearchBar from '../components/serverlist/SearchBar'
import ServerListItem from '../components/serverlist/ServerListItem'
const I18N = require('../i18n/en.json')
const servers = require('./testServers.json')

export default {
  components: {
    SearchBar,
    ServerListItem
  },
  computed: {
    filteredServers () {
      return this.availableServers.filter(server => {
        if (!this.filter.includeSpectate && server.spectators.enabled) {
          return false
        }

        if (!this.filter.includePassword && server.password) {
          return false
        }
        return true
      })
    }
  },
  data () {
    return {
      availableServers: [],
      i18n: I18N,
      filter: {

      }
    }
  },
  mounted: function () {
    this.availableServers = servers // Done like this so ESLint doesn't ree at unused vars
  }
}
</script>
