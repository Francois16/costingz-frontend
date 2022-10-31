import { createApp } from "vue";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import ToastPlugin from "vue-toast-notification";

// WindiCSS
import "virtual:windi.css";
import "vue-toast-notification/dist/theme-sugar.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(autoAnimatePlugin);
app.use(ToastPlugin);
app.use(createPinia());
app.use(router);

app.mount("#app");
