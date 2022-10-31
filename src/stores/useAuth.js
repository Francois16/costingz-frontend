import { defineStore } from "pinia";
import axios from "../helpers/axios";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: localStorage.getItem("user") || null,
    isAuthenticated: localStorage.getItem("token") ? true : false,
  }),
  getters: {},
  actions: {
    // Logs the user in and sets access/refresh token to localStorage
    async setUserAuthenticationStatus() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          this.setAxiosAuthorizationHeader(token);
          const user = await axios.get("/auth/users/me");

          // Set user in local storage.
          delete user.data.id;
          localStorage.setItem("user", JSON.stringify(user.data));
          this.user = user.data;
          this.isAuthenticated = true;
        } catch (error) {
          this.logout();
        }
      }
    },

    // Logs the user out of the application
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      axios.defaults.headers.common["Authorization"] = "";
    },

    setAxiosAuthorizationHeader(token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
  },
});
