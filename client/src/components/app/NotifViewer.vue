<template>
  <v-snackbar
    :value="showNotifs"
    bottom
    right

    dark
    :timeout="0"
  >
    <v-list dark
      height="400"
    >

        <v-list-item
          v-for="(notif) in notifs"
          @click="dismiss(notif.id)"
          :key="'notif-' + notif.id"
        >

          <v-list-item-icon>
            <v-icon
              :color="notif.type"
            >
              mdi-close
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title :class="`${notif.type}--text`" v-text="notif.title"/>
            {{ notif.message }}
          </v-list-item-content>
        </v-list-item>
    </v-list>
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NotifViewer',
  computed: {
    ...mapState({
      notifs: state => state.ui.notifs
    }),
    showNotifs () {
      return this.notifs && this.notifs.length
    },
    model: {
      get: function () { return this.notifs.map((n, i) => i) },
      set: function (value) { }
    }
  },
  methods: {
    dismiss (id) {
      this.$store.dispatch('ui/removeNotif', id)
    }
  }
}
</script>

<style scoped>
</style>
