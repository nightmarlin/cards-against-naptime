<template>
  <v-card hover>
    <v-card-title>
      <div class="title">
        {{ serverObj.name }}
      </div>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon v-on="on" right>
            mdi-{{ serverObj.password ? 'lock' : 'lock-open-variant-outline' }}
          </v-icon>
        </template>
        <span>{{ serverObj.password ? 'This game requires a password' : 'Open game, no password needed' }}</span>
      </v-tooltip>
    </v-card-title>

    <v-card-text>
      <div class="text-truncate">
        {{ serverObj.description }}
      </div>
    </v-card-text>

    <v-divider />

    <v-card-text>
      <v-container>
        <v-layout row>
          <v-flex xs6 sm6 md6 lg6 xl6> <!-- Decks in use -->
            <v-card dark>
              <v-card-title><div class="text subtitle-1">Decks in use</div></v-card-title>
              <v-divider />
              <v-list light dense class="overflow-y-auto" max-height="250">
                <v-list-item
                  v-for="(d, i) in serverObj.decks"
                  :key="`deck-${i}`"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ d.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ d.description }}</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-icon>
                    <a
                      :href="dataUrl + d.id"
                      target="_blank"
                    >
                      <v-icon color="primary" small>mdi-open-in-new</v-icon>
                    </a>
                  </v-list-item-icon>
                </v-list-item>
              </v-list>
            </v-card>
          </v-flex>

          <v-flex grow> <!-- Member info -->
            <v-card dark>
              <v-card-title><div class="text subtitle-1">Members</div></v-card-title>
            </v-card>
          </v-flex>

          <v-flex xs3 sm3 md3 lg3 xl3 v-show="serverObj.spectators.enabled"> <!-- Spectator info -->
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn large color="primary">
        Join
        <v-icon right>mdi-login</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const DATA_URL = 'https://api.cardsagainstnaptime.com/cs/'
export default {
  name: 'serverlistItem',
  data () {
    return {
      dataUrl: DATA_URL
    }
  },
  props: {
    serverObj: {
      type: Object,
      required: true
    }
  }
}
</script>
