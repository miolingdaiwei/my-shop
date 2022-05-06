import { RouterView, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw = {
  path: "order",
  name: "order",
  component: RouterView,
  meta: {
    title: "order",
  },
  // 子路由出口
  children: [
    {
      path: "order_list",
      name: "order_list",
      component: () => import("@/views/order/list/index.vue"),
      meta: {
        title: "order_list",
      },
    },
    {
      path: "order_offline",
      name: "order_offline",
      component: () => import("@/views/order/offline/index.vue"),
      meta: {
        title: "order_pffline",
      },
    },
  ],
};

export default routes;
