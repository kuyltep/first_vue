import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/components/pages/Main.vue"),
  },
  {
    path: "/post-page",
    component: () => import("@/components/pages/PostPage"),
  },
  {
    path: "/about",
    component: () => import("@/components/pages/About"),
  },
  {
    path: "/post-page/:id",
    component: () => import("@/components/pages/PostIdPage"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});
export default router;
