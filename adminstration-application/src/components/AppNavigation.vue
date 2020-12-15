<template>
  <span>
    <v-app-bar app color="primary" dark>
      <router-link to="/">
        <v-toolbar-title>
          <h1>{{ appTitle }}</h1>
        </v-toolbar-title>
      </router-link>
      <v-spacer />
      <div v-if="isAuthenticated">
        <span>
          <app-navigation-sub-menu :menuList="statisticsOptions" />
        </span>
        <span>
          <app-navigation-sub-menu :menuList="loggingOptions" />
        </span>
        <span>
          <app-navigation-sub-menu :menuList="adminOptions" />
        </span>
        <v-btn outlined color="secondary" @click="logout">LOGOUT</v-btn>
      </div>
    </v-app-bar>
  </span>
</template>

<script>
import AppNavigationSubMenu from "@/components/AppNavigationSubMenu";

export default {
  name: "AppNavigation",
  components: {
    AppNavigationSubMenu,
  },
  data() {
    return {
      appTitle: "Bankster",
      adminOptions: {
        title: "ADMIN",
        options: [
          {
            subTitle: "CREATE ADMIN",
            to: "register",
          },
          {
            subTitle: "UPDATE ADMIN",
            to: "update",
          },
          {
            subTitle: "DELETE ADMIN",
            to: "delete",
          },
        ],
      },
      loggingOptions: {
        title: "LOGS",
        options: [
          {
            subTitle: "LATEST LOGS",
            to: "latest-logs",
          },
        ],
      },
      statisticsOptions: {
        title: "STATISTICS",
        options: [
          {
            subTitle: "DESTRIBUTION OF MICROSERVICES",
            to: "distribution-of-microservices",
          },
          {
            subTitle: "DESTRIBUTION OF LOGINS",
            to: "distribution-of-logins",
          },
        ],
      },
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("adminLogout");
    },
  },
};
</script>

<style scoped>
a h1 {
  color: white;
  text-decoration: none;
}

span {
  margin-right: 12px;
}
</style>
