import axios from "axios";

const BASE_URL = "http://localhost:3001/";

const state = {
  auth_token: null,
  user: {
    id: null,
    email: null,
    name: null,
  },
};

const getters = {
  getAuthToken(state) {
    return state.auth_token;
  },
  getUserId(state) {
    return state.user?.id;
  },
  getUserEmail(state) {
    return state.user?.email;
  },
  getUserName(state) {
    return state.user?.name;
  },
  isLoggedIn(state) {
    state.auth_token = localStorage.getItem("auth_token");
    const loggedOut = state.auth_token == null || state.auth_token == JSON.stringify(null);
    return !loggedOut;
  }
};

const actions = {
  registerUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
      .post(`${BASE_URL}signup`, payload)
      .then((response) => {
        commit("setUserInfo", response);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  },
  loginUser({ commit }, payload) {
    new Promise((resolve, reject) => {
      axios
      .post(`${BASE_URL}login`, payload)
      .then((response) => {
        commit("setUserInfo", response);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
    });
  },
  logoutUser({ commit }) {
    const config = {
      headers: {
        authorization: state.auth_token,
      },
    };
    new Promise((resolve, reject) => {
      axios
      .delete(`${BASE_URL}logout`, config)
      .then(() => {
        commit("resetUserInfo");
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
    });
  },
};

const mutations = {
  setUserInfo(state, data) {
    console.log(data.data.status.data.user);
    state.user = data.data.status.data.user;
    state.auth_token = data.headers.authorization;
    axios.defaults.headers.common["Authorization"] = data.headers.authorization;
    localStorage.setItem("auth_token", data.headers.authorization);
  },
  resetUserInfo(state) {
    state.user = {
      name: null,
      email: null,
    };
    state.auth_token = null;
    localStorage.removeItem("auth_token");
    axios.defaults.headers.common["Authorization"] = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};