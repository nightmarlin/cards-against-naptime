<template>
  <v-expand-transition>
    <v-toolbar
      floating
      :extended="showOptions"
      @click="isOpen = !isOpen"
    >
      <template v-if="showOptions" #extension>
        <v-toolbar-items>
          <v-btn>hmmm</v-btn>
        </v-toolbar-items>
      </template>

      <v-icon>mdi-magnify</v-icon>

      <v-text-field
        @click.stop=""
        hide-details
        single-line
        v-show="isOpen"
        v-model="search.term"
        class="mx-3"
      />

      <v-icon
        v-show="isOpen"
        @click.stop="showOptions = !showOptions"
      >
        mdi-tune
      </v-icon>

    </v-toolbar>
  </v-expand-transition>
</template>

<script>
export default {
  name: 'searchBar',
  data () {
    return {
      search: {
        term: '',
        includeSpectate: true, // Show games that are full but have empty spectator slots
        includePassword: true, // Show games that require a password
        searchByDeck: false, // Change the search criteria to deck names
        searchByAuthor: false, // Change the search criteria to game author names
        showFull: false // Show games that are full
      },
      isOpen: false,
      showOptions: false
    }
  },
  computed: {
    fullSearch () {
      return this.search
    }
  }
}
</script>

<style>

</style>
