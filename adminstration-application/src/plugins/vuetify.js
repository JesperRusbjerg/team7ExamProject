import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#03a9f4",
        secondary: "#3f51b5",
        accent: "#607d8b",
        error: "#f44336",
        warning: "#ffc107",
        info: "#00bcd4",
        success: "#4caf50",
      },
    },
  },
});
