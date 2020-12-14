<template>
  <v-container fluid fill-height class="home-hero" style="max-height: 100vh">
    <v-layout justify-center align-center column pa-5>
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12" v-if="!isAuthenticated">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Adminstrator login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    prepend-icon="mdi-account-tie"
                    name="email"
                    label="Email"
                    type="email"
                    v-model="email"
                    :rules="emailRules"
                    required
                  />
                  <v-text-field
                    prepend-icon="mdi-lock"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                    required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" :disabled="!valid" @click="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
            <v-card class="elevation-12" v-else>
              <v-toolbar dark color="primary">
                <v-toolbar-title>You are logged in!</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <p>You can use the navigationbar to navigate to other pages</p>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "HomeLogin",
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password must be greater than 6 characters",
      ],
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("adminLogin", {
          email: this.email,
          password: this.password,
        });
      }
    },
  },
};
</script>

<style scoped></style>
