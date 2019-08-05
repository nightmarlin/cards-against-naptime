<template>
  <v-layout justify-center >

    <v-flex >
      <card card-uid="CS001WC001" init-text="Let's go" :init-is-black="true" />
    </v-flex>

    <v-flex>
      <server-list-item :server="testServer" />
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
        author: 'Marlin',
        accentColor: '#777777',
        decks: [
          { name: 'Default', description: 'Cood old CAN', id: 1, cards: { black: 50, blank: 2, white: 200 } },
          { name: 'Radix 8', description: 'Extra techy for those who need it', id: 2234, cards: { black: 25, blank: 0, white: 100 } },
          { name: 'Cards against kittens', description: 'aww', id: 543, cards: { black: 40, blank: 10, white: 150 } },
          { name: 'UK expansion pack 1', description: 'More cards for more fun', id: 222, cards: { black: 10, blank: 2, white: 100 } }
        ],
        description: 'For funsies',
        maxMemberCount: '12',
        memberCount: '6',
        name: 'Test Server',
        password: false,
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
