<template>
  <v-container fluid fill-height class="home-hero" style="max-height: 100vh">
    <v-layout justify-center align-center column pa-5>
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Reports (Last ten reports)</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-list dense disabled>
                  <v-list-item-group>
                    <v-list-item v-for="(item, i) in items" :key="i">
                      <v-list-item-icon>
                        <v-icon>mdi-numeric-{{ i + 1 }}-circle</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>{{ item }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
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
  name: "LatestLogs",
  data: () => ({
    items: [
      "This is a very important log message",
      "This is just some information",
      "Who knows what this message contains",
      "Blah blah blah... blah?",
      "Another message for display",
      "Why do we keep doing this?",
      "Did someone just try to hack us",
      "Where does this message come from?",
      "Now we are near the end of this test data",
      "Shit son! We just got hacked... ",
    ],
  }),
  methods: {
    getNow() {
      const today = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/-/g, "/")
        .replace("T", " ");
      return today;
    },
  },
};
</script>

<style scoped></style>
