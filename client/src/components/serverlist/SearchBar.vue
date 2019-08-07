<template>
  <v-toolbar
    :extended="search.advanced"
  >
    <template v-if="search.advanced" #extension>
      <v-layout row class="ma-4" justify-center align-center>
        <v-flex> <!-- "Search by" selectors -->
          <v-switch
            append-icon="mdi-account-multiple"
            inset
            label="Show spectatable games"
            v-model="search.includeSpectate"
          />
        </v-flex>

        <v-flex> <!-- "Search by" selectors -->
          <v-switch
            append-icon="mdi-lock"
            inset
            label="Show password protected games"
            v-model="search.includePassword"
          />
        </v-flex>

        <v-flex> <!-- "Search by" selectors -->
          <v-switch
            append-icon="mdi-hexagon-slice-6"
            inset
            label="Show full games"
            v-model="search.includeFull"
          />
        </v-flex>

        <v-flex>
          <v-switch
            append-icon="mdi-pencil"
            inset
            label="Search by author name"
            v-model="search.searchByAuthor"
          />
          <v-text-field
            single-line
            solo
            hint="Type name here"
            v-model="search.authorName"
            v-show="search.searchByAuthor"
          />
        </v-flex>

        <v-flex>
          <v-switch
            append-icon="mdi-cards"
            inset
            label="Search by decks in use"
            v-model="search.searchByDecks"
          />
          <v-combobox
            chips
            multiple
            solo
            hint="Type deck names here"
            v-model="search.deckNames"
            v-show="search.searchByDecks"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="remove(item)"
              >
                <strong>{{ item }}</strong>
              </v-chip>
            </template>
          </v-combobox>
        </v-flex>
      </v-layout>
    </template>

    <v-text-field
      hide-details
      single-line
      prepend-icon="mdi-magnify"
      v-model="search.term"
      class="mx-3"
    />

    <v-icon
      @click.stop="search.advanced = !search.advanced"
      :color="search.advanced ? 'primary' : ''"
    >
      mdi-tune
    </v-icon>

  </v-toolbar>
</template>

<script>
export default {
  name: 'SearchBar',
  data () {
    return {
      search: {
        advanced: false,
        gameName: '',
        includeFull: false, // Show games that are full
        includeSpectate: true, // Show games that are full but have empty spectator slots
        includePassword: true, // Show games that require a password
        searchByDecks: false, // Change the search criteria to deck names
        deckNames: [],
        searchByAuthor: false, // Change the search criteria to game author names
        authorName: ''
      }
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
