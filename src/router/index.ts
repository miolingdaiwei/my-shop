import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Layout from "../views/layout/index.vue";
import productRouts from "./modules/product";
import order from "./modules/order";
import media from "./modules/media";
import permissiom from "./modules/permission";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        name: "default",
        component: () => import("@/views/home/index.vue"),
      },
      {
        path: "/home", //默认子路由
        name: "home",
        component: () => import("@/views/home/index.vue"),
      },
      productRouts,
      order,
      media,
      permissiom,
    ],
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 全局前置守卫
router.beforeEach(() => {
  nprogress.start();
});
// 全局后置守卫
router.afterEach(() => nprogress.done());

export default router;
