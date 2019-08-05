<template>
  <v-card>
    <v-card-title>
      <div class="title">
        {{ server.name }}
      </div>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" right>
            mdi-{{ server.password ? 'lock' : 'lock-open-variant-outline' }}
          </v-icon>
        </template>
        <span>{{ server.password ? 'This game requires a password' : 'Open game, no password needed' }}</span>
      </v-tooltip>
    </v-card-title>

    <v-card-text>
      <div class="text-truncate">
        {{ server.description }}
      </div>
    </v-card-text>

    <v-divider />

    <v-card-text>
      <v-container>
        <v-layout row>
          <v-flex xs12 sm12 md8 lg8 xl8> <!-- Decks in use -->
            <v-card
              :dark="darkColor"
              :color="server.accentColor"
              outlined
              :ripple="$vuetify.breakpoint.smAndDown"
            >

              <v-card-title
                @click="showList = !showList"
              >
                <div class="text subtitle-1">Decks in use</div>
                <v-spacer />
                <v-icon>mdi-cards</v-icon>
              </v-card-title>
              <v-divider />

              <v-expand-transition>
                <v-list
                  dense
                  class="overflow-y-auto"
                  max-height="250"
                  v-show="($vuetify.breakpoint.mdAndUp || showList)"
                >
                  <v-list-item
                    v-for="(d, i) in server.decks"
                    :key="`deck-${i}`"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{ d.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ d.description }}</v-list-item-subtitle>
                      <v-list-item-subtitle>
                        CARDS: {{ d.cards.black }} BLACK / {{ d.cards.white }} WHITE / {{ d.cards.blank }} BLANK
                      </v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <a
                        :href="dataUrl + d.id"
                        target="_blank"
                      >
                        <v-icon :color="server.accentColor" small>mdi-open-in-new</v-icon>
                      </a>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-expand-transition>

            </v-card>
          </v-flex>

          <v-flex grow> <!-- Member info -->
            <v-card :dark="darkColor" :color="server.accentColor" outlined class="fill-height">
              <v-card-title>
                <div class="text subtitle-1">Members{{ server.spectators.enabled ? ' and Spectators' : '' }}</div>
                <v-spacer />
                <v-icon>mdi-account-group</v-icon>
              </v-card-title>

              <v-divider />

              <v-card-text>
                <div class="headline">
                  {{ server.memberCount }} / {{ server.maxMemberCount }} Members
                </div>

                <br />

                <div class="headline" v-show="server.spectators.enabled">
                  {{ server.spectators.spectatorCount }} / {{ server.spectators.maxSpectatorCount }} Spectators
                </div>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        class="mx-3"
        large
        :color="server.accentColor"
        @click="joinClicked"
      >
        Join
        <v-icon right>mdi-login</v-icon>
      </v-btn>

      <v-btn
        class="mx-3"
        large
        color="secondary"
        v-show="server.spectators.enabled"
        @click="spectateClicked"
      >
        Spectate
        <v-icon right>mdi-account-multiple</v-icon>
      </v-btn>
    </v-card-actions>

    <v-fade-transition>
      <v-overlay
        v-if="passwordOverlay"
        absolute
        color="#000000"
      >
        <v-card>
          <v-card-title>Please enter the password to {{ joining ? 'join' : 'spectate' }} the game</v-card-title>

          <v-text-field
            class="mx-4 my-2"
            v-model="enteredPassword"
            hint="Ask the creator if you can't remember"
            :type="showPasswordtext ? 'text' : 'password'"
            :append-icon="showPasswordtext ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPasswordtext = !showPasswordtext"
          />

          <v-card-actions>
            <v-spacer />
            <v-btn color="success" class="mx-3 my-2" @click="validatePasswordClicked" outlined>
              go
              <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn color="error" class="mx-3 my-2" @click="cancelOverlay" outlined>
              cancel
              <v-icon right>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-overlay>
    </v-fade-transition>

  </v-card>

</template>

<script>
const color = require('color')
const DATA_URL = 'https://api.cardsagainstnaptime.com/cs/'
export default {
  name: 'serverlistItem',
  data () {
    return {
      darkColor: false,
      dataUrl: DATA_URL,
      enteredPassword: '',
      joining: null, // true: join game, false: spectate game
      passwordOverlay: false,
      showList: false,
      showPasswordtext: false
    }
  },
  props: {
    server: {
      type: Object,
      required: true
    }
  },
  methods: {
    enter () { },
    joinClicked () {
      this.joining = true

      if (this.server.password) {
        this.passwordOverlay = true
      } else {
        this.enter()
      }
    },
    spectateClicked () {
      this.joining = false

      if (this.server.password) {
        this.passwordOverlay = true
      } else {
        this.enter()
      }
    },
    validatePasswordClicked () {},
    cancelOverlay () {
      this.passwordOverlay = false
      this.joining = null
      this.enteredPassword = ''
    }
  },
  mounted () {
    this.darkColor = color(this.server.accentColor).isDark()
  }
}
</script>
