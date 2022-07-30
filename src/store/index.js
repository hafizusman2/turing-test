import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: { user: null },
  getters: {},
  mutations: {
    SET_USER_DATA(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${user.access_token}`;
    },
  },
  actions: {
    login({ commit, dispatch }, userData) {
      return axios
        .post(`${process.env.VUE_APP_BASE_URL}auth/login`, userData)
        .then((res) => {
          commit("SET_USER_DATA", res.data);
          dispatch("refresh");
        });
    },
    refresh({ commit }) {
      return setInterval(() => {
        return axios
          .post(`${process.env.VUE_APP_BASE_URL}auth/refresh-token`)
          .then((res) => {
            commit("SET_USER_DATA", res.data);
          });
      }, 1000 * 60 * 5);
    },
  },
  modules: {},
});
