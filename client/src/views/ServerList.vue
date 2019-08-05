<template>
<!--

  So the plan is simple: have a grid list display a list of servers

-->
  <div>
    <server-list-item />
  </div>
</template>

<script>
import serverListItem from '../components/serverlist/serverlistItem'
const I18N = require('../i18n/en.json')

export default {
  components: {
    serverListItem
  },
  data () {
    return {
      availableServers: [
        { name: '', maxMemberCount: '', memberCount: '', description: '' }
      ],
      i18n: I18N
    }
  },
  mounted: function () {
    this.availableServers[0].description = this.i18n.serverList.testDesc // Done like this so ESLint doesn't ree at unused vars
  }
}
</script>
