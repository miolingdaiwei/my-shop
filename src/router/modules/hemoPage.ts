import { RouterView, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw = {
  path: "homePage",
  name: "homePage",
  component: RouterView,
  meta: {
    title: "homePage",
  },
  // 子路由出口
  children: [
    {
      path: "swiper",
      name: "swiper",
      component: () => import("@/views/homePage/swiper/index.vue"),
      meta: {
        title: "swiper",
      },
    },
    {
      path: "newGoods",
      name: "newGoods",
      component: () => import("@/views/homePage/newGoods/index.vue"),
      meta: {
        title: "newGoods",
      },
    },
    {
      path: "hotList",
      name: "hotList",
      component: () => import("@/views/homePage/hotList/index.vue"),
      meta: {
        title: "hotList",
      },
    },
    {
      path: "recommend",
      name: "recommend",
      component: () => import("@/views/homePage/recommend/index.vue"),
      meta: {
        title: "recommend",
      },
    },
  ],
};

export default routes;
