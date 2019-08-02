<template>
  <v-card>
  <!--v-fade-transition-->

    <v-card-title v-show="loginStatus.isLoggedIn">
      <h2 class="text display-1">Welcome back {{ loginStatus.username }}</h2>
    </v-card-title>

    <v-card-text v-show="loginStatus.isLoggedIn">
      <p class="text body-1">As you're already logged in, you can just click below to continue</p>
    </v-card-text>

    <v-card-actions v-show="loginStatus.isLoggedIn">
      <v-spacer />
      <v-btn>Continue<v-icon>mdi-login</v-icon></v-btn>
    </v-card-actions>

    <v-tabs
      dark
      v-model="tab"
      v-show="!loginStatus.isLoggedIn"
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
        ><v-card-text>
          <v-layout row justify-center>
            <v-flex xs10 sm10 md10 lg10 xl10>
              <v-form
                ref="details"
              >

                <v-text-field
                  :counter="formRules.usernameMaxLength"
                  v-model="username"
                  label="Username"
                  :hint="`${t.name === 'Signup' ? 'Must be unique (being funny is optional)' : '' }`"
                  :rules="t.name === 'Signup' ? formRules.usernameRules : []"
                />

                <v-text-field
                  v-model="password"
                  label="Password"
                  :hint="`${t.name === 'Signup' ? 'We cannot guarantee perfect security. Do not use a password you have used elsewhere.' : '' }`"
                  :rules="t.name === 'Signup' ? formRules.pswdRules : []"
                />

                <br />

                <v-btn
                  :color="`${t.name === 'Signup' ? 'teal lighten-3' : 'primary' }`"
                >
                {{ t.name }}
                </v-btn>

              </v-form>
            </v-flex>
          </v-layout>
        </v-card-text></v-card>

      </v-tab-item>

    </v-tabs>

  <!--/v-fade-transition-->
  </v-card>
</template>

<script>
export default {
  name: 'loginBox',
  props: {
    loginStatus: Object
  },
  data () {
    return {
      username: '',
      password: '',
      isSignUp: false,

      tab: null,
      tabs: [
        { name: 'Login', icon: 'mdi-login' },
        { name: 'Signup', icon: 'mdi-pen' }
      ],

      formRules: {
        usernameMaxLength: 32,
        usernameRules: [
          u => !!u || 'Username is required',
          u => (u && u.length <= 32) || 'Usernames cannot be longer than 32 characters'
        ],
        pswdRules: [
          p => !!p || 'Password is required',
          p => (p && (p.length >= 4)) || 'Passwords must be at least 4 characters',
          p => (p && (p.toUpperCase() !== p) && (p.toLowerCase() !== p)) || 'Passwords must contain at least one upper and lower case character'
        ]
      }
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        alert('valid')
      }
    }
  }
}
</script>
