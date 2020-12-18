import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import facade from "@/scripts/facade";

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
      facade.login({ username: email, password }).then((res) => {
        commit("setAdmin", res.data);
        commit("setIsAuthenticated", true);
        sessionStorage.setItem("session-id", res.data);
      });
    },
    adminLogout({ commit }) {
      commit("setAdmin", null);
      commit("setIsAuthenticated", false);
      sessionStorage.setItem("session-id", null);
      router.push("/");
    },
    adminRegister({ commit }, { email, password }) {
      facade.register({ username: email, password }).then((res) => {
        if (res.data === "User created") {
          commit("setIsAdminCreated", true);
        }
      })
    },
    adminUpdate({ commit }, { email, password }) {
      console.log(`Successfully updated user with email: ${email} with password ${password}`);
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
      facade.latestLogs()
        .then((res) => {
          commit("setLatestLogs", res.data.reverse())
        })
        .catch();
    },
    fetchDistributionOfLogins({ commit }) {
      facade.distributionOfLogins()
        .then((res) => {
          const failed = res.data.howManyLoginAttempsFail;
          const successfully = 100 - failed;
          commit("setDistributionOfLogins", [successfully, failed]);
        });

    },
    fetchDistributionOfMicroservices({ commit }) {
      facade.distributionOfMicroservices()
        .then((res) => {
          console.log(res);
          const distribution = [
            res.data.creditScore,
            res.data.proxy,
            res.data.email,
            res.data.login,
            res.data.currency,
            res.data.statistics,
          ];
          commit("setDistributionOfMicroservices", distribution);
        });

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
