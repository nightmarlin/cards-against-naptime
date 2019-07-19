<template>
    <v-card
      class="mx-auto white-card"
      max-width="250"
      height="300"
    >
      <v-card-title>{{ text }}</v-card-title>
    </v-card>
</template>

<script>
export default {
  name: 'card',
  props: {
    initResponseCount: Object,
    // Standard - Pick 2 - Draw 2 Pick 3
    initIsBlack: Boolean,
    initIsBlank: Boolean,
    initText: String
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
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style>
.blackCardBackground {
  background-color: darkslategray;
}

.white-card {
  background-color: blanchedalmond;
  color: black;
}
</style>
