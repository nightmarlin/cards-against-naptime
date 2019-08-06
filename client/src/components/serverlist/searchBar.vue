<template>
  <v-expand-transition>
    <v-toolbar
      :width="isOpen ? 400 : 64"
      floating
      absolute
      collapse
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
        term: ''
      },
      isOpen: false,
      showOptions: false
    }
  }
}
</script>

<style>

</style>
