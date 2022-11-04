import axios from "axios";
import router from "../router";
import { useAuthStore } from "../stores/useAuth";

axios.defaults.baseURL = "http://localhost:8000";

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Redirect to login page if token has expired
    const auth = useAuthStore();
    if (error.response.status == 401) {
      console.log("401 reached");
      auth.logout();
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default axios;
