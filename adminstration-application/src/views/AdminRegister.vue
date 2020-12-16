<template>
  <v-container fluid fill-height class="home-hero" style="max-height: 100vh">
    <v-layout justify-center align-center column pa-5>
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Adminstrator Registration</v-toolbar-title>
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
                    name="password1"
                    label="Password"
                    type="password"
                    v-model="password1"
                    :rules="passwordRules1"
                    required
                  />
                  <v-text-field
                    prepend-icon="mdi-lock"
                    name="password2"
                    label="Retype Password"
                    type="password"
                    v-model="password2"
                    :rules="passwordRules2"
                    required
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" :disabled="!valid" @click="submit"
                  >Register</v-btn
                >
              </v-card-actions>
              <v-alert
                v-if="isAdminCreated"
                border="bottom"
                dismissible
                elevation="5"
                type="success"
                @click="closeAlert()"
                >An admin has been registered!
              </v-alert>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "AdminRegister",
  data() {
    return {
      valid: false,
      email: "",
      password1: "",
      password2: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules1: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password must be greater than 6 characters",
      ],
      passwordRules2: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 6 || "Password must be greater than 6 characters",
        (v) => v === this.password1 || "Passwords must match",
      ],
    };
  },
  computed: {
    isAdminCreated() {
      return this.$store.getters.isAdminCreated;
    },
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("adminRegister", {
          email: this.email,
          password: this.password1,
        });
      }
    },
    closeAlert() {
      this.$store.dispatch("resetSuccessMessages");
    },
  },
};
</script>

<style scoped></style>
