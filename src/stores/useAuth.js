import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
import axios from "../helpers/axios";

const toast = useToast();

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: localStorage.getItem("user") || "",
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
      this.user = "";
      this.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      axios.defaults.headers.common["Authorization"] = "";
      toast.info("Successfully logged out! from store");
      this.router.push({ name: "login" });
    },

    setAxiosAuthorizationHeader(token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
  },
});
