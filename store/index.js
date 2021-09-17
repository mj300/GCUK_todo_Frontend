import Vuex from "vuex";
import Cookie from "js-cookie";
import { Login, Register } from "../module/api/auth";

const setTokenAndCookies = (vuexContext, response) => {
  vuexContext.commit("setToken", response.data.token);
  localStorage.setItem("token", response.data.token);
  localStorage.setItem(
    "fullName",
    `${response.data.firstName} ${response.data.lastName}`
  );
  localStorage.setItem("tokenExpiration", new Date().getTime() + 604800000);
  Cookie.set("jwt", response.data.token);
  Cookie.set("expirationDate", new Date().getTime() + 604800000);
};

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: null
    },
    mutations: {
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      async authenticateUser(vuexContext, authData) {
        let response = await Login({
          username: authData.username,
          password: authData.password
        });
        switch (response.status) {
          case 200:
            setTokenAndCookies(vuexContext, response);
            break;
          default:
            return response;
        }
      },
      async registerUser(vuexContext, registerData) {
        let response = await Register({
          username: registerData.username,
          password: registerData.password,
          firstName: registerData.firstName,
          lastName: registerData.lastName
        });
        switch (response.status) {
          case 200:
            setTokenAndCookies(vuexContext, response);
            break;
          default:
            return response;
        }
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else if (process.client) {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log("No token or invalid token");
          vuexContext.dispatch("logout");
          return;
        }
        vuexContext.commit("setToken", token);
      },
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
          localStorage.removeItem("fullName");
        }
      }
    },
    getters: {
      isAuthenticated(state) {
        return state.token != null;
      }
    }
  });
};

export default createStore;
