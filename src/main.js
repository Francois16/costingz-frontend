import { createApp } from "vue";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import Toast, { POSITION } from "vue-toastification";
import VueTippy from "vue-tippy";

// WindiCSS
import "virtual:windi.css";
import "vue-toastification/dist/index.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();

// Add router to all pinia stores.
pinia.use(() => ({ router: router }));

app.use(autoAnimatePlugin);
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
});
app.use(VueTippy, {
  defaultProps: { placement: "top", theme: "material" },
});
app.use(pinia);
app.use(router);

app.mount("#app");
