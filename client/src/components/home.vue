<template>
  <v-layout>

    <v-flex xs8> <!-- Splash -->
      <v-timeline :dense="$vuetify.breakpoint.smAndDown" :reverse="true" align-top>
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
              <span v-html="marked(timelineObj.text)" />
            </v-card-text>
          </v-card>

        </v-timeline-item>
      </v-timeline>
    </v-flex>

    <v-flex xs4> <!-- Login -->
      //
    </v-flex>

  </v-layout>
</template>

<script>
const MARKED = require('marked')

export default {
  name: 'Home',
  data () {
    return {
      timelineObjs: [
        {
          icon: 'mdi-star',
          dotCol: 'blue',
          iconCol: 'primary',
          title: 'Cards Against Naptime',
          text: `TFW no QT SO`
        },
        {
          icon: 'mdi-star',
          dotCol: 'red',
          iconCol: 'secondary',
          title: 'Why we\'re here and what we do',
          text: `So basically we got tired of the only decent CAH clone being PretendYoureXyzzy, so we made our own.
          It's gonna feature cool shit like *memes*`
        },
        {
          icon: 'mdi-star',
          dotCol: 'green',
          iconCol: '',
          title: 'How to play',
          text: ``
        }
      ]
    }
  },
  methods: {
    marked: MARKED
  }
}
</script>
