import { createApp } from "vue";
import { createPinia } from "pinia";
import ToastPlugin from "vue-toast-notification";

import "./style.css";
import App from "./App.vue";
import "vue-toast-notification/dist/theme-sugar.css";

const pinia = createPinia();

export const app = createApp(App)
  .use(ToastPlugin, {
    position: "bottom-right",
    pouseOnHover: true,
  })
  .use(pinia)
  .mount("#app");
