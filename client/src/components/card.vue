<template>
    <v-card
      class="white-card flexcard"
      max-width="250"
      height="300"
    >
      <v-card-title>{{ text }}</v-card-title>

      <v-card-text class="grow" />

      <v-card-actions>
        <v-btn>click</v-btn>
        <v-spacer />
        <canvas :id=cardJsonCanvasId class="cardJsonCanvas" />
      </v-card-actions>
    </v-card>
</template>

<script>
const qrcode = require('qrcode')

export default {
  name: 'card',
  props: {
    initResponseCount: Object,
    // Standard - Pick 2 - Draw 2 Pick 3
    initIsBlack: Boolean,
    initIsBlank: Boolean,
    initText: String,
    cardUid: String
  },
  data () {
    return {
      responseCount: this.initResponseCount,
      isBlack: this.initIsBlack,
      isBlank: this.initIsBlank,
      text: this.initText,
      isSelected: false,
      isHovered: false
    }
  },
  computed: {
    cardJsonCanvasId: function () { return this.cardUid + 'CardJsonCanvasId' }
  },
  methods: { },
  watch: { },
  mounted () {
    let idRetrievalPattern = /CS([0-9]*)(WC|BC|XX)([0-9]*)/

    let csIdArr = idRetrievalPattern.exec(this.cardUid)

    if (csIdArr) {
      let cardSetId, cardId
      cardSetId = 'CS' + csIdArr[1]
      cardId = csIdArr[2] + csIdArr[3]

      let cardJson = `["${cardSetId}", "${cardId}"]`

      qrcode.toCanvas(document.getElementById(this.cardJsonCanvasId), cardJson, { margin: 1, scale: 1 }, function (err) {
        if (err) console.error(err)
      })
    }
  }
}
</script>

<style scoped>
.blackCardBackground {
  background-color: black;
  color: white;
}

.white-card {
  background-color: white;
  color: black;
}

.cardJsonCanvas {
  height: 250;
  width: 250;
}

.flexcard {
  display: flex;
  flex-direction: column;
}
</style>
