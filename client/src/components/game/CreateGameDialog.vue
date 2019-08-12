<template>
  <v-dialog
    v-model='showDialog'
    persistent
  >

    <template v-slot:activator='{ on }'>
      <v-btn>
        Open
      </v-btn>
    </template>

    <v-card dark>
      <v-card-title>
        Create Game
      </v-card-title>

      <v-card-text>
        <!-- Needed:
        * Game name
        * Game description
        * Accent colour
        * Max member count
        * Spectators?
          * Max spectator count
        * Password?
          * Set password
        * Decks
        -->
      </v-card-text>

      <v-card-actions>
        <v-btn color="error">
          <v-icon left>mdi-close-circle</v-icon>
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'createGameDialog',
  data () {
    return {
      availableDecks: [
        { name: 'Default', description: 'Cood old CAN', id: 1, cards: { black: 50, 'blank': 2, white: 200 } },
        { name: 'Radix 8', description: 'Extra techy for those who need it', id: 2234, cards: { black: 25, 'blank': 0, white: 100 } },
        { name: 'Cards against kittens', description: 'aww', id: 543, cards: { black: 40, 'blank': 10, white: 150 } },
        { name: 'UK expansion pack 1', description: 'More cards for more fun', id: 222, cards: { black: 10, 'blank': 2, white: 100 } }
      ]
    }
  },
  computed: {
    serverDetails () {
      return {
        author: this.loggedInUsername,
        accentColor: '#000000',
        decks: [ ],
        description: '',
        maxMemberCount: 0,
        name: '',
        password: false,
        passwordText: '',
        spectators: {
          enabled: false,
          maxSpectatorCount: null
        },
        url: null
      }
    }
  },
  methods: {
    ...mapState({
      loggedInUsername: state => state.user.username
    })
  },
  props: {
    showDialog: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
