import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: {
      admin: null,
      isAuthenticated: false,
    },
    admin: {
      isAdminCreated: false,
      isAdminUpdated: false,
      isAdminDeleted: false,
    },
    logs: {
      latestLogs: [],
    },
    statitics: {
      logins: [],
      microservices: [],
    },
  },
  mutations: {
    setAdmin(state, payload) {
      state.login.admin = payload;
    },
    setIsAuthenticated(state, payload) {
      state.login.isAuthenticated = payload;
    },
    setIsAdminCreated(state, payload) {
      state.admin.isAdminCreated = payload;
    },
    setIsAdminUpdated(state, payload) {
      state.admin.isAdminUpdated = payload;
    },
    setIsAdminDeleted(state, payload) {
      state.admin.isAdminDeleted = payload;
    },
    setLatestLogs(state, payload) {
      state.logs.latestLogs = payload;
    },
    setDistributionOfLogins(state, payload) {
      state.statitics.logins = payload;
    },
    setDistributionOfMicroservices(state, payload) {
      state.statitics.microservices = payload;
    },
  },
  actions: {
    adminLogin({ commit }, { email, password }) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((admin) => {
          commit("setAdmin", admin);
          commit("setIsAuthenticated", true);
        })
        .catch(() => {
          commit("setAdmin", null);
          commit("setIsAuthenticated", false);
          router.push("/error");
        });
    },
    adminLogout({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setAdmin", null);
          commit("setIsAuthenticated", false);
        })
        .catch(() => {
          commit("setAdmin", null);
          commit("setIsAuthenticated", false);
          router.push("/error");
        });
    },
    adminRegister({ commit }, { email, password }) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          commit("setIsAdminCreated", true);
        })
        .catch(() => {
          router.push("/error");
        });
    },
    adminUpdate({ commit }, { email, password }) {
      console.log(
        `Successfully updated user with email: ${email} with password ${password}`
      );
      commit("setIsAdminUpdated", true);
    },
    adminDelete({ commit }, { email }) {
      console.log(`Successfully deleted user with email: ${email}`);
      commit("setIsAdminDeleted", true);
    },
    resetSuccessMessages({ commit }) {
      commit("setIsAdminCreated", false);
      commit("setIsAdminUpdated", false);
      commit("setIsAdminDeleted", false);
    },
    fetchLatestLogs({ commit }) {
      // Fetching latest logs
      const latestLogs = [
        "This is a very important log message",
        "This is just some information",
        "Who knows what this message contains",
        "Blah blah blah... blah?",
        "Another message for display",
        "Why do we keep doing this?",
        "Did someone just try to hack us",
        "Where does this message come from?",
        "Now we are near the end of this test data",
        "Shit son! We just got hacked...",
      ];
      commit("setLatestLogs", latestLogs);
    },
    fetchDistributionOfLogins({ commit }) {
      // Fetching failed logins
      const failed = 24;
      const successfully = 100 - failed;
      commit("setDistributionOfLogins", [successfully, failed]);
    },
    fetchDistributionOfMicroservices({ commit }) {
      // Fetching distribution of microservices
      const distribution = {
        creditScore: 16,
        proxy: 14,
        email: 30,
        login: 7,
        currency: 23,
        statistics: 10,
      };
      const convertedDistribution = [
        distribution.creditScore,
        distribution.proxy,
        distribution.email,
        distribution.login,
        distribution.currency,
        distribution.statistics,
      ];
      commit("setDistributionOfMicroservices", convertedDistribution);
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.login.admin !== null && state.login.admin !== undefined;
    },
    isAdminCreated(state) {
      return state.admin.isAdminCreated;
    },
    isAdminUpdated(state) {
      return state.admin.isAdminUpdated;
    },
    isAdminDeleted(state) {
      return state.admin.isAdminDeleted;
    },
    getLatestLogs(state) {
      return state.logs.latestLogs;
    },
    getDistributionOfLogins(state) {
      return state.statitics.logins;
    },
    getDistributionOfMicroservices(state) {
      return state.statitics.microservices;
    },
  },
});
