import Vue from "vue";
import Router from "vue-router";
import HomeLogin from "@/views/HomeLogin.vue";
import store from "@/store/index.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home-login",
      component: HomeLogin,
    },
    {
      path: "/register",
      name: "admin-register",
      component: () => import("@/views/AdminRegister.vue"),
    },
    {
      path: "/update",
      name: "admin-update",
      component: () => import("@/views/AdminUpdate.vue"),
    },
    {
      path: "/delete",
      name: "admin-delete",
      component: () => import("@/views/AdminDelete.vue"),
    },
    {
      path: "/latest-logs",
      name: "latest-logs",
      component: () => import("@/views/LatestLogs.vue"),
    },
    {
      path: "/distribution-of-microservices",
      name: "distribution-of-microservices",
      component: () => import("@/views/DistributionOfMicroservices.vue"),
    },
    {
      path: "/distribution-of-logins",
      name: "distribution-of-logins",
      component: () => import("@/views/DistributionOfLogins.vue"),
    },
    {
      path: "/error",
      name: "error",
      component: () => import("@/views/Error.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (!store.state.isAuthenticated) {
      next({
        path: "/",
      });
    }
  }
  next();
});

export default router;
