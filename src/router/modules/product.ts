import { RouterView, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw = {
  path: "product",
  name: "product",
  component: RouterView,
  meta: {
    title: "product",
  },
  // 子路由出口
  children: [
    {
      path: "product_list",
      name: "product_list",
      component: () => import("@/views/product/list/index.vue"),
      meta: {
        title: "product_list",
      },
    },
    {
      path: "product_add",
      name: "product_add",
      component: () => import("@/views/product/add/index.vue"),
      meta: {
        title: "product_add",
      },
    },
    {
      path: "product_attr",
      name: "product_attr",
      component: () => import("@/views/product/attr/index.vue"),
      meta: {
        title: "product_attr",
      },
    },
    {
      path: "product_reply",
      name: "product_reply",
      component: () => import("@/views/product/reply/index.vue"),
      meta: {
        title: "product_reply",
      },
    },
    {
      path: "product_hot",
      name: "product_hot",
      component: () => import("@/views/product/hotList/index.vue"),
      meta: {
        title: "product_hot",
      },
    },
  ],
};

export default routes;
