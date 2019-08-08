<template>
  <v-layout justify-center align-center>
    <v-flex>
      <create-game-dialog :showDialog="showDialog" />
    </v-flex>
  </v-layout>
</template>

<script>
import createGameDialog from '../components/game/CreateGameDialog'
export default {
  components: {
    createGameDialog
  },
  data () {
    return {
      showDialog: true
    }
  },
  methods: { },
  mounted () { }
}
</script>

<style>

</style>
