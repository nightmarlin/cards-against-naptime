<template>
  <v-flex>

    <!--  -->

  </v-flex>
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
      responseCount: this.props.initResponseCount,
      isBlack: this.props.initIsBlack,
      isBlank: this.props.initIsBlank,
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
