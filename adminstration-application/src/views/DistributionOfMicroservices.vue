<template>
  <v-container fluid fill-height class="home-hero" style="max-height: 100vh">
    <v-layout justify-center align-center column pa-5>
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Distribution of microservices</v-toolbar-title>
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
  name: "DistributionOfMicroservices",
  beforeMount() {
    this.$store.dispatch("fetchDistributionOfMicroservices");
  },
  components: {
    VueApexCharts,
  },
  data: () => ({
    chartOptions: {
      colors: ["#03a9f4", "#f44336", "#3f51b5", "#ffc107", "#00bcd4", "#4caf50"],
      labels: [
        "Credit score module",
        "Proxy module",
        "Email module",
        "Login module",
        "Currency module",
        "Statistics module",
      ],
    },
  }),
  computed: {
    series() {
      return this.$store.getters.getDistributionOfMicroservices;
    },
  },
};
</script>

<style scoped></style>
