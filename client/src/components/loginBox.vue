<template>
  <v-tabs
    vertical
    v-model="tab"
  >

    <v-tab
      v-for="(t, i) in tabs"
      :key="i"
      :href="`#tab-${t.name}`"
    >
     {{ t.name }}
     <v-icon> {{ t.icon }} </v-icon>
    </v-tab>

    <v-tab-item
      v-for="(t, i) in tabs"
      :key="i"
      :value="`tab-${t.name}`"
    >

      <v-card
        flat
        tile
      >
        <v-card-text>{{ t.name }}</v-card-text>
      </v-card>

    </v-tab-item>

  </v-tabs>
</template>

<script>
export default {
  name: 'loginBox',
  data () {
    return {
      username: '',
      password: '',
      isSignUp: false,

      tab: null,
      tabs: [
        { name: 'Login', icon: 'mdi-login' },
        { name: 'Signup', icon: 'mdi-pen' }
      ]
    }
  }
}
</script>
