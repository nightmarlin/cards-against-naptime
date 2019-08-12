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
        <v-spacer />
        <v-divider vertical class="mx-3" />
        <span class="text body-1 font-italic">Game by {{ loggedInUsername ? loggedInUsername : 'Unknown User' }}</span>
      </v-card-title>

      <v-divider />

      <v-expand-transition>
        <v-card-text>
          <!-- Needed:
          * Game name ✅
          * Game description ✅
          * Accent colour
          * Max member count
          * Spectators?
            * Max spectator count
          * Password?
            * Set password
          * Decks
          -->
          <v-layout row justify-space-between align-space-between>
            <v-flex sm3> <!-- Name -->
              <v-text-field
                outlined rounded
                class="px-3"
                v-model="serverDetails.name"
                label="Game name"
                hint="Make it a good one"
                :maxlength="maxNameLength"
                :counter="maxNameLength"
                :rules="nameRules"
              />
            </v-flex>

            <v-flex sm8> <!-- Description -->
              <v-text-field
                outlined rounded
                v-model="serverDetails.description"
                label="Game description"
                hint="Optional"
                class="px-3"
                :maxlength="maxDescriptionLength"
                :counter="maxDescriptionLength"
                :rules="descriptionRules"
              />
            </v-flex>
          </v-layout>

          <v-layout row justify-space-between align-center>
            <v-flex sm5> <!-- Max Members -->
              <v-slider dark
                :max="absoluteMaxMemberCount"
                :min="1"
                v-model="serverDetails.maxMemberCount"
                label="Max # of members"
                class="mx-3"
                thumb-label
                color="accent"
              >
                <template v-slot:append>
                  <v-text-field
                    v-model="serverDetails.maxMemberCount"
                    :max="absoluteMaxMemberCount"
                    :min="1"
                    class="mt-0 pt-0"
                    hide-details
                    single-line
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
              </v-slider>
            </v-flex>

            <v-flex sm5> <!-- Spectators and max # of spectators -->
              <v-layout column>
                <v-flex>
                  <v-checkbox
                    class="mx-3"
                    v-model="serverDetails.spectators.enabled"
                    :label="`Spectating ${ serverDetails.spectators.enabled ? 'enabled' : 'disabled' }`"
                  />
                </v-flex>

                <v-flex v-show="serverDetails.spectators.enabled" >
                  <v-slider dark
                    color="accent"
                    :max="absoluteMaxSpectatorCount"
                    :min="1"
                    v-model="serverDetails.spectators.maxSpectatorCount"
                    label="Max # of spectators"
                    class="mx-3"
                    thumb-label
                  >
                    <template v-slot:append>
                      <v-text-field
                        v-model="serverDetails.spectators.maxSpectatorCount"
                        :max="absoluteMaxSpectatorCount"
                        :min="1"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="number"
                        style="width: 60px"
                      ></v-text-field>
                    </template>
                  </v-slider>
                </v-flex>

              </v-layout>
            </v-flex>

          </v-layout>

        </v-card-text>
      </v-expand-transition>

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
      absoluteMaxMemberCount: 12,
      absoluteMaxSpectatorCount: 24,
      availableDecks: [
        { name: 'Default', description: 'Cood old CAN', id: 1, cards: { black: 50, 'blank': 2, white: 200 } },
        { name: 'Radix 8', description: 'Extra techy for those who need it', id: 2234, cards: { black: 25, 'blank': 0, white: 100 } },
        { name: 'Cards against kittens', description: 'aww', id: 543, cards: { black: 40, 'blank': 10, white: 150 } },
        { name: 'UK expansion pack 1', description: 'More cards for more fun', id: 222, cards: { black: 10, 'blank': 2, white: 100 } }
      ],
      nameRules: [
        name => !!name || 'Name is required',
        n => n.length <= 32 || 'Max name length is 32',
        n => n.length >= 4 || 'Min name length is 4'
      ],
      maxNameLength: 32,
      descriptionRules: [
        desc => desc.length <= 128 || 'Max description length is 128'
      ],
      maxDescriptionLength: 128,
      serverDetails: {
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
          maxSpectatorCount: 1
        },
        url: null
      }
    }
  },
  computed: {
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
