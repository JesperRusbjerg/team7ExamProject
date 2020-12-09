<template>
  <v-container fluid fill-height class="home-hero" style="max-height: 100vh">
    <v-layout justify-center align-center column pa-5>
      <div class="display-4 font-weight-black white--text text-xs-center">
        BANKSTER
      </div>
      <div class="display-3 font-weight-black white--text text-xs-center mb-3">
        ADMINSTRATION
      </div>
      <div class="display-1 font-weight-bold white--text text-xs-center">
        Create adminstrators, see invalid logins, piecharts with our micro
        services and which loans are most searched for and much more is to come!
      </div>
      <v-btn fab color="primary">
        <v-icon large color="white">mdi-chevron-down</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "HomeHero",
};
</script>

<style scoped>
.home-hero {
  background: url("http://source.unsplash.com/84PTCoyzRBA");
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
