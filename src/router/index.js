import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../views/login/index.vue";
import Welcome from "../views/welcome/index.vue";
import store from "../store/index";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Auth,
      meta: {
        guest: true
      }
    },

    {
      path: "/profile",
      name: "profile",
      component: Welcome,
      meta: {
        secure: true
      }
    }
  ]
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.secure)) {
    // if no token
    if (!store.state.loggedIn) {
      //console.log("no token");
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!store.state.loggedIn) {
      next();
    } else {
      //console.log("no token");
      next({
        path: "/profile"
      });
    }
  } else {
    next();
  }
});
export default router;