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
      path: "category",
      name: "category",
      meta: {
        title: "category",
      },
      component: RouterView,
      children: [
        {
          path: "",
          component: import("@/views/product/category/index.vue"),
        },
        {
          path: "level2",
          name: "level2",
          component: import("@/views/product/category/index.vue"),
          meta: {
            title: "level2",
          },
          children: [
            {
              path: "level3",
              name: "level3",
              component: import("@/views/product/category/index.vue"),
              meta: {
                title: "level3",
              },
            },
          ],
        },
      ],
    },
  ],
};

export default routes;
