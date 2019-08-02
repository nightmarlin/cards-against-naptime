<template>
  <v-hover >
    <v-card
      :class="`${initIsBlack ? 'black' : 'white'}-card flexcard`"
      max-width="250"
      height="300"
    >
      <v-card-title>{{ text }}</v-card-title>

      <v-card-text class="grow" />

      <v-card-actions>
        <v-btn class="btn" :color="`${initIsBlack ? 'primary' : 'error' }`" >click</v-btn>
        <v-spacer />
        <v-img :src="cardQrCodeSrc" class="cardJsonImg"/>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
const qrcode = require('qrcode')
const DATA_URL = 'https://api.cardsagainstnaptime.com/cs/'

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
      isHovered: false,

      cardQrCodeSrc: ''
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

      let cardData = DATA_URL + `${cardSetId}/${cardId}`

      qrcode.toDataURL(cardData, { margin: 1, scale: 1, width: 100, height: 100 }, (err, url) => {
        if (err) console.error(err)
        this.cardQrCodeSrc = url
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

.black-card {
  background-color: black;
  color: white;
}

.flexcard {
  display: flex;
  flex-direction: column;
}

.cardJsonImg {
  background-color: white;

  border-radius: 4px;
  border-width: 2px;
  border-color: white;
  border-style: solid;

}
</style>
