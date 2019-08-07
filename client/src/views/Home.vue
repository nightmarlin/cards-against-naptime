<template>
  <v-layout row>
    <v-flex sm12 md4 pa-4 align-self-top> <!-- Login -->
      <login-box/>
    </v-flex>

    <v-flex sm12 md8> <!-- Splash -->
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
  </v-layout>
</template>

<script>
import LoginBox from './LoginBox'
const MARKED = require('marked')
const i18n = require('../i18n/en.json')

export default {
  name: 'Home',
  components: {
    LoginBox
  },
  data () {
    return {
      timelineObjs: [
        {
          icon: 'mdi-sleep-off',
          dotCol: 'blue',
          iconCol: 'white',
          title: i18n.home.timelineText[0].title,
          text: i18n.home.timelineText[0].text,
          bottomIcons: ['creation', 'sleep-off', 'death-star'],
          expanded: true
        },
        {
          icon: 'mdi-all-inclusive',
          dotCol: 'red',
          iconCol: 'white',
          title: i18n.home.timelineText[1].title,
          text: i18n.home.timelineText[1].text,
          bottomIcons: [ 'play', 'wrench', 'chart-bar', 'discord' ],
          expanded: false
        },
        {
          icon: 'mdi-help',
          dotCol: 'green',
          iconCol: 'white',
          title: i18n.home.timelineText[2].title,
          text: i18n.home.timelineText[2].text,
          bottomIcons: ['pizza', 'looks', 'barcode-scan'],
          expanded: false
        },
        {
          icon: 'mdi-database',
          dotCol: 'blue-grey darken-2',
          iconCol: 'white',
          title: i18n.home.timelineText[3].title,
          text: i18n.home.timelineText[3].text,
          bottomIcons: ['bank', 'briefcase', 'cookie', 'safe'],
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
