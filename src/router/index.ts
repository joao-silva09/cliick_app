import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      el: "#main",
      top: 0,
    };
  },
});

export default router;