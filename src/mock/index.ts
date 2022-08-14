export default [
  {
    type: "get",
    url: "/user/login",
    response: () => {
      return { isAuth: true };
    },
  },
  {
    type: "get",
    url: "/user/menu",
    response: () => {
      return {
        menusList: [
          {
            id: "/sysManagent",
            title: "系统管理",
            subMenuList: [
              {
                id: "/userList",
                title: "用户管理",
                path: "/user/manage",
              },
              {
                id: "/roleList",
                title: "角色管理",
                path: "/user/role",
              },
              {
                id: "/permissionList",
                title: "权限管理",
                path: "/user/permission",
              },
            ],
          },
          {
            id: "businessManagent",
            title: "业务管理",
            subMenuList: [
              {
                id: "/businessList",
                title: "业务逻辑",
              },
            ],
          },
        ],
        statusCode: 200,
      };
    },
  },
];
