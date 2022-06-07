import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isAuthenticated: false,
    refreshToken: "",
    accessToken: "",
  }),
  getters: {},
  actions: {
    login(data) {
      this.setAccessToken(data.access);
      this.setRefreshToken(data.refresh);
      this.isAuthenticated = true;
    },

    checkAuthentication() {
      this.accessToken = this.getAccessToken();
      this.refreshToken = this.getRefreshToken();

      if (this.accessToken) {
        this.isAuthenticated = true;
      } else if (this.refreshToken) {
        console.log("ran");
        axios
          .post("/auth/jwt/refresh/", { refresh: this.refreshToken })
          .then((response) => {
            console.log(response);
            this.accessToken = response.access;
            this.setAccessToken(response.access);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        useRouter().push("/accounts/login");
      }
    },

    setAccessToken(token) {
      localStorage.setItem("accessToken", token);
    },

    setRefreshToken(token) {
      localStorage.setItem("refreshToken", token);
    },

    getAccessToken() {
      return localStorage.getItem("accessToken");
    },

    getRefreshToken() {
      return localStorage.getItem("refreshToken");
    },

    logout() {
      this.isAuthenticated = false;
      this.accessToken = "";
      this.refreshToken = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});
