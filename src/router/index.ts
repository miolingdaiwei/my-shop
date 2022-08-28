import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import Layout from "../views/layout/index.vue";
import product from "./modules/product";
import order from "./modules/order";
import media from "./modules/media";
import permissiom from "./modules/permission";
import homePage from "./modules/hemoPage";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { localGet } from "@/untils/common";

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
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
      },
      product,
      order,
      media,
      permissiom,
      homePage,
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 全局前置守卫;
router.beforeEach((to, from, next) => {
  //只能防止第一次进来时没有token
  nprogress.start();
  if (to.path == "/login") next();
  else {
    if (!localGet("token"))
      next({
        path: "/login",
      });
    else {
      next();
    }
  }
});
// 全局后置守卫;
router.afterEach(() => nprogress.done());
export default router;
