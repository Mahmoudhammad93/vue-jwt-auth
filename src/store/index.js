import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
import axios from "axios";

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: null,
    token: null
  },
  plugins: [new VuexPersistence().plugin],
  mutations: {
    SET_user(state, payload) {
      state.user = payload;
    },
    SET_token(state, payload) {
      state.token = payload;
    },
    SET_loggedIn(state, payload) {
      state.loggedIn = payload;
    }
  },
  actions: {
    performLoginAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://127.0.0.1:8000/accounts/api-auth/", {
            username: payload.username,
            password: payload.password
          })
          .then(res => {
            commit("SET_token", res.data.access);
            commit("SET_user", res.data.user);
            commit("SET_loggedIn", true);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    performLogoutAction({ commit }) {
      commit("SET_token", null);
      commit("SET_loggedIn", false);
      commit("SET_user", null);
    },

  },
  getters: {
    get_loggedIn(state) {
      return state.loggedIn;
    },
    get_user(state) {
      return state.user;
    }
  }
});
