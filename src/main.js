import { createApp } from "vue";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import Toast, { POSITION } from "vue-toastification";

// WindiCSS
import "virtual:windi.css";
import "vue-toastification/dist/index.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(autoAnimatePlugin);
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
});
app.use(createPinia());
app.use(router);

app.mount("#app");
