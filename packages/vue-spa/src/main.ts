import App from "@/App.vue";
import "@/assets/style.css";
import { router } from "@/router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { queryClient } from "./shared/query";

createApp(App)
  .use(createPinia())
  .use(router)
  .use(VueQueryPlugin, { queryClient })
  .mount("#app");
