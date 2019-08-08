<template>
  <v-dialog
    v-model="showDialog"
    persistent
  >

    <template v-slot:activator="{ on }">
      <v-btn>
        Open
      </v-btn>
    </template>

    <v-card>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'createGameDialog',
  data () {
    return {
      //
    }
  },
  props: {
    showDialog: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
