<template>
  <v-app>
    <app-navigation></app-navigation>

    <v-main transition="slide-x-transition">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppNavigation from "@/components/AppNavigation";

export default {
  name: "App",
  components: {
    AppNavigation,
  },
};
</script>

<style>
</style>