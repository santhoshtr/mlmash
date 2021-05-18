import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Letter from "@/views/Letter.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/letter/:letter",
    name: "letter",
    component: Letter,
    props: true,
  },
  {
    path: "/conjunct/:letter",
    name: "conjunct",
    component: Letter,
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    component: Home,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;