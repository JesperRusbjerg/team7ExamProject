<template>
  <v-container fluid fill-height class="home-hero" style="max-height: 100vh">
    <v-layout justify-center align-center column pa-5>
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Distribution of logins</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <vue-apex-charts
                  type="pie"
                  width="500"
                  :options="chartOptions"
                  :series="series"
                />
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
  </v-container>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "DistributionOfLogins",
  beforeMount(to, from, next) {
    this.$store.dispatch("fetchDistributionOfLogins").then(() => {
      next();
    });
  },
  components: {
    VueApexCharts,
  },
  data: () => ({
    chartOptions: {
      colors: ["#4caf50", "#f44336"],
      labels: ["Successfully logins", "Failed logins"],
    },
  }),
  computed: {
    series() {
      return this.$store.getters.getDistributionOfLogins;
    },
  },
};
</script>

<style scoped></style>
