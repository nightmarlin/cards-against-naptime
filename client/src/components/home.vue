<template>
  <v-layout>

    <v-flex xs8> <!-- Splash -->
      <v-layout fill-height justify-center>
        <v-flex xs12 md10 xl8>
          <v-timeline :dense="$vuetify.breakpoint.mdAndDown">
            <v-timeline-item

              fill-dot
              align-top

              v-for="(timelineObj, i) in timelineObjs"
              :key="i"
              :icon="timelineObj.icon"
              :icon-color="timelineObj.iconCol"
              :color="timelineObj.dotCol"
            >

              <v-card class="elevation-2" :color="timelineObj.dotCol" dark>
                <v-card-title class="headline">{{ timelineObj.title }}</v-card-title>
                <v-card-text class="white text--primary">
                  <br />
                  <span v-html="marked(timelineObj.text)" />
                </v-card-text>
              </v-card>

            </v-timeline-item>
          </v-timeline>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs4 align-self-center> <!-- Login -->
      <login-box />
    </v-flex>

  </v-layout>
</template>

<script>
import loginBox from './loginBox'
const MARKED = require('marked')

export default {
  name: 'Home',
  components: {
    loginBox
  },
  data () {
    return {
      timelineObjs: [
        {
          icon: 'mdi-sleep-off',
          dotCol: 'blue',
          iconCol: 'white',
          title: 'Cards Against Naptime',
          text: `TFW no QT SO`,
          bottomIcons: []
        },
        {
          icon: 'mdi-all-inclusive',
          dotCol: 'red',
          iconCol: 'white',
          title: 'Why we\'re here and what we do',
          text: `So basically we got tired of the only decent CAH clone being PretendYoureXyzzy, so we made our own.
It's gonna feature cool stuff like:\n
* Playing games of Cards Against Naptime: OF COURSE\n
* Building your own card decks: Try to keep it funny\n
* Viewing your sweet, sweet stats: Show the world how much of an evil bastard you really are\n
* Discord interactivity: organising a game has never been so simple
`,
          bottomIcons: [ 'mdi-play', 'mdi-wrench', 'mdi-chart-bar', 'mdi-discord' ]
        },
        {
          icon: 'mdi-help',
          dotCol: 'green',
          iconCol: 'white',
          title: 'How to play',
          text: ``,
          bottomIcons: []
        }
      ]
    }
  },
  methods: {
    marked: MARKED
  }
}
</script>
