<template>
  <v-flex>

    <!--  -->

  </v-flex>
</template>

<script>
export default {
  name: 'card',
  props: {
    initBlackCardType: Object,
    // Standard - Pick 2 - Draw 2 Pick 3
    initIsBlack: Boolean,
    initText: String
  },
  data () {
    return {
      blackCardType: this.props.initBlackCardType,
      isBlack: this.props.initIsBlack,
      text: this.props.text,
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
.cardBackground {
  background-color: darkslategray;
}
</style>
