import { createApp } from "vue";
import { createPinia } from "pinia";

// WindiCSS
import "virtual:windi.css";

// Axios
import axios from "axios";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

axios.defaults.baseURL = "http://localhost:8000";

app.use(createPinia());
app.use(router);

app.mount("#app");
