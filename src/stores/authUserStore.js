import { defineStore } from "pinia";

export const useAuthUserStore = defineStore({
    id: "auth",
    state: () => ({
        isAuthenticated: false,
        refreshToken: "",
        accessToken: "",
    }),
    actions: {
        login(data) {
            this.setAccessToken(data.access)
            this.setRefreshToken(data.refresh)

            this.isAuthenticated = true
        },

        setAccessToken(token) {
            localStorage.setItem("accessToken", token)
        },

        getAccessToken() {
            localStorage.getItem("accessToken")
        },

        setRefreshToken(token) {
            localStorage.setItem("refreshToken", token)
        },

        getRefreshToken() {
            localStorage.getItem("refreshToken")
        }
    }
})