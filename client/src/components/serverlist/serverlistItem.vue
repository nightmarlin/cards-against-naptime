<template>
  <v-card>
    <v-card-title>
      <div class="title">
        {{ server.name }}
      </div>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" right>
            mdi-{{ server.password ? 'lock' : 'lock-open-outline' }}
          </v-icon>
        </template>
        <span>{{ server.password ? 'This game requires a password' : 'Open game, no password needed' }}</span>
      </v-tooltip>

      <v-spacer/>

      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            small
            outlined
            color="error"
            @click="removeButtonClicked"
            v-on="on"
            v-show="false"
          >
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </template>
        <span>Remove this game from your list</span>
      </v-tooltip>
    </v-card-title>

    <v-card-text>
      <div class="text subtitle-1">
        {{ server.description }}
      </div>
      <div class="text subtitle-2">
        Created by {{ server.author }}
      </div>
    </v-card-text>

    <v-divider />

    <v-card-text>
      <v-container>
        <v-layout column reverse>
          <v-flex> <!-- Decks in use -->
            <v-card
              :dark="darkColor"
              :color="server.accentColor"
              outlined
              ripple
            >

              <v-card-title
                @click="showList = !showList"
              >
                <v-icon left transition="fade-transition">mdi-chevron-{{ showList ? 'up' : 'down' }}</v-icon>
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
                  v-show="showList"
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
                        <v-icon :dark="darkColor">mdi-eye</v-icon>
                      </a>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-expand-transition>

            </v-card>
          </v-flex>

          <v-flex> <!-- Member info   -->
            <v-card :dark="darkColor" :color="server.accentColor" outlined class="fill-height">
              <v-card-title>
                <div class="text subtitle-1">Members{{ server.spectators.enabled ? ' and Spectators' : '' }}</div>
                <v-spacer />
                <v-icon>mdi-account-group</v-icon>
              </v-card-title>

              <v-divider />

              <v-card-text>
                <v-layout align-center justify-center>

                  <v-flex class="body-1 text-center">
                    {{ server.memberCount }} / {{ server.maxMemberCount }} Members
                  </v-flex>

                  <v-divider inset vertical v-show="server.spectators.enabled" />

                  <v-flex class="body-1 text-center" v-show="server.spectators.enabled">
                    {{ server.spectators.spectatorCount }} / {{ server.spectators.maxSpectatorCount }} Spectators
                  </v-flex>

                </v-layout>
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
        :dark="darkColor"
        @click="joinClicked"
        :disabled="server.memberCount == server.maxMemberCount"
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
        :disabled="server.spectators.spectatorCount == server.spectators.maxSpectatorCount"
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
        <v-card class="ma-4">
          <v-card-title>
            {{ i18n.serverlistItem.password.prompt.replace('XX', (joining ? 'join' : 'spectate')) }}
          </v-card-title>

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
            <v-btn :color="server.accentColor" class="mx-3 my-2" @click="validatePasswordClicked" outlined>
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
const I18N = require('../../i18n/en.json')

export default {
  name: 'serverlistItem',
  data () {
    return {
      darkColor: false,
      dataUrl: DATA_URL,
      enteredPassword: '',
      i18n: I18N,
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
    validatePasswordClicked () { },
    cancelOverlay () {
      this.passwordOverlay = false
      this.joining = null
      this.enteredPassword = ''
    },
    removeButtonClicked () {}
  },
  mounted () {
    this.darkColor = color(this.server.accentColor).isDark()
  }
}
</script>

<style scoped>

a {
  text-decoration: none;
}

</style>
