<template>
  <v-layout row justify-center >

    <v-flex >
      <card card-uid="CS001WC001" init-text="Let's go" :init-is-black="true" />
    </v-flex>

    <v-flex>
      <server-list-item :serverObj="testServer" />
    </v-flex>
  </v-layout>
</template>

<script>
import card from '../components/game/card'
import serverListItem from '../components/serverlist/serverlistItem'
export default {
  components: {
    card,
    serverListItem
  },
  data () {
    return {
      testServer: {
        decks: [
          { name: 'Default', description: 'Cood old CAN', id: 1 },
          { name: 'Radix 8', description: 'Extra techy for those who need it', id: 2234 },
          { name: 'Cards against kittens', description: 'aww', id: 543 },
          { name: 'UK expansion pack 1', description: 'More cards for more fun', id: 222 }
        ],
        description: 'For funsies',
        maxMemberCount: '12',
        memberCount: '6',
        name: 'Test Server',
        password: true,
        spectators: {
          enabled: true,
          maxSpectatorCount: 10,
          spectatorCount: 4
        }
      }
    }
  }
}
</script>

<style>

</style>
