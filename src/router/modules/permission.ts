import { RouterView, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw = {
  path: "permission",
  name: "permission",
  component: RouterView,
  meta: {
    title: "permission",
  },
  // 子路由出口
  children: [
    {
      path: "permission_admin",
      name: "permission_admin",
      component: () => import("@/views/permission/admin/index.vue"),
      meta: {
        title: "permission_admin",
      },
    },
    {
      path: "permission_role",
      name: "permission_role",
      component: () => import("@/views/permission/role/index.vue"),
      meta: {
        title: "permission_role",
      },
    },
    {
      path: "permission_rule",
      name: "permission_rule",
      component: () => import("@/views/permission/rule/index.vue"),
      meta: {
        title: "permission_rule",
      },
    },
  ],
};

export default routes;
