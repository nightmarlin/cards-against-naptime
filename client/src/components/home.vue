<template>
  <v-layout>

    <v-flex xs8> <!-- Splash -->
      <v-layout fill-height justify-center>
        <v-flex xs12 md10 xl8>
          <v-timeline reverse :dense="$vuetify.breakpoint.mdAndDown">
            <v-timeline-item

              fill-dot

              v-for="(timelineObj, i) in timelineObjs"
              :key="i"
              :icon="timelineObj.icon"
              :icon-color="timelineObj.iconCol"
              :color="timelineObj.dotCol"
            >

              <v-card class="elevation-2" :color="timelineObj.dotCol" dark @click="timelineObj.expanded = !timelineObj.expanded">
                <v-card-title class="headline">
                  {{ timelineObj.title }}
                  <v-spacer />
                  <v-icon transition="fade-transition">mdi-{{ timelineObj.expanded ? 'chevron-up' : 'chevron-down' }}</v-icon>
                </v-card-title>
                <v-expand-transition>
                  <v-card-text class="white text--primary" v-show="timelineObj.expanded">
                    <br />
                    <span v-html="marked(timelineObj.text)" />
                  </v-card-text>
                </v-expand-transition>

                <v-card-actions>
                  <v-layout justify-space-around>
                  <v-flex
                    v-for="(ico, idx) in timelineObj.bottomIcons"
                    :key="idx"
                    shrink
                  >
                    <v-icon>
                    mdi-{{ ico }}
                    </v-icon>
                  </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>

            </v-timeline-item>
          </v-timeline>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs4 pa-4 align-self-top> <!-- Login -->
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
          text: `
Here for all of your Cards Against Humanity ripoff needs.

If you're new, feel free to read on. If you know what you're doing, then go ahead and do it 💙
`,
          bottomIcons: ['sleep-off'],
          expanded: true
        },
        {
          icon: 'mdi-all-inclusive',
          dotCol: 'red',
          iconCol: 'white',
          title: 'Why we\'re here and what we do',
          text: `
So basically we got tired of the only decent CAH clone being PretendYoureXyzzy, so we made our own.
Featuring cool stuff like:

* Playing games of Cards Against Naptime: OF COURSE

* Building your own card decks: Try to keep it funny

* Viewing your sweet, sweet stats: Show the world how much of an evil bastard you really are

* Discord interactivity: organising a game has never been so simple
`,
          bottomIcons: [ 'play', 'wrench', 'chart-bar', 'discord' ],
          expanded: false
        },
        {
          icon: 'mdi-help',
          dotCol: 'green',
          iconCol: 'white',
          title: 'How to play',
          text: `
1. Sign Up or Log In using the box on the left

2. Join or Create a game

  A. If creating a game, pick the decks you want to use

3. Start Playing! The game will pick a Card Tsar - All you need to do is play your cards

If you find a card or deck that you really like, you can scan or click the QR code to be taken to the deck's display page!
`,
          bottomIcons: ['fire', 'barcode-scan'],
          expanded: false
        },
        {
          icon: 'mdi-database',
          dotCol: 'blue-grey darken-2',
          iconCol: 'white',
          title: 'Our Relationship With Your Data',
          text: `
We don't want to fill this page with legalese, so [here's the full version](/#/tscs)

To summarise:


`,
          bottomIcons: ['bank', 'briefcase', 'desktop-mac', 'safe'],
          expanded: true
        }
      ]
    }
  },
  methods: {
    marked: MARKED
  }
}
</script>
