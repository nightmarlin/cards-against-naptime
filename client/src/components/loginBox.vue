<template>
  <v-fade-transition>
    <v-card v-if="isLoggedIn">
      <v-card-title>
        <h2 class="text display-1">{{ i18n.loginBox.returnGreeting }}{{ loggedInUsername }}</h2>
      </v-card-title>

      <v-card-text>
        <p class="text body-1">{{ i18n.loginBox.returnGreetingContext }}</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn>Continue<v-icon>mdi-login</v-icon></v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-tabs
        dark
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
            <v-card-text>
              <v-layout row justify-center>
                <v-flex xs10 sm10 md10 lg10 xl10>
                  <v-form
                    ref="details"
                  >

                    <v-text-field
                      :counter="formRules.usernameMaxLength"
                      v-model="username"
                      :label="i18n.loginBox.username"
                      :hint="`${t.name === i18n.loginBox.signup ? i18n.loginBox.hints.username : '' }`"
                      :rules="t.name === i18n.loginBox.signup ? formRules.usernameRules : []"
                    />

                    <v-text-field
                      v-model="password"
                      :label="i18n.loginBox.password"
                      :hint="`${t.name === i18n.loginBox.signup ? i18n.loginBox.hints.password : '' }`"
                      :rules="t.name === i18n.loginBox.signup ? formRules.pswdRules : []"
                    />

                    <br />

                    <v-btn
                      :color="`${t.name === i18n.loginBox.signup ? 'teal lighten-3' : 'primary' }`"
                      @click="interactionButton(t)"
                      :disabled="loading"
                      :loading="loading"
                    >
                      {{ t.name }}
                    </v-btn>

                  </v-form>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-fade-transition>

</template>

<script>
import { mapState, mapGetters } from 'vuex'
const I18N = require('../i18n/en.json')

export default {
  name: 'loginBox',
  props: {
    loginStatus: Object
  },
  computed: {
    ...mapState({
      loggedInUsername: state => state.user.username
    }),
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn'
    })
  },
  data () {
    return {
      i18n: I18N,
      username: '',
      password: '',
      isSignUp: false,
      loading: false,

      tab: null,
      tabs: [
        { name: this.i18n.loginBox.login, icon: 'mdi-login' },
        { name: this.i18n.loginBox.signup, icon: 'mdi-pen' }
      ],

      formRules: {
        usernameMaxLength: 32,
        usernameRules: [
          u => !!u || this.i18n.loginBox.errors.username.notPresent,
          u => (u && u.length <= 32) || this.i18n.loginBox.errors.username.tooLong
        ],
        pswdRules: [
          p => !!p || this.i18n.loginBox.errors.password.notPresent,
          p => (p && (p.length >= 4)) || this.i18n.loginBox.errors.password.tooShort,
          p => (p && (p.toUpperCase() !== p) && (p.toLowerCase() !== p)) || this.i18n.loginBox.errors.password.tooSimple
        ]
      }
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        alert('valid')
      }
    },
    async interactionButton (t) {
      this.loading = true

      const action = t.name === this.i18n.loginBox.login ? 'user/login' : 'user/register'
      await this.$store.dispatch(action, {
        username: this.username,
        password: this.password
      })

      this.loading = false
    }
  }
}
</script>
