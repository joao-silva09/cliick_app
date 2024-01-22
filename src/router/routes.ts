import Guard from "../services/middleware";

export const routes = [
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "home" */ "../layouts/Auth.vue"),
    beforeEnter: Guard.redirectIfAuthenticated,
    children: [
      {
        path: "",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/Login.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "home" */ "../layouts/Default.vue"),
    beforeEnter: Guard.redirectIfNotAuthenticated,
    children: [
      {
        path: "",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Home.vue"),
      },
      {
        path: "customers",
        name: "customers",
        component: () =>
          import(/* webpackChunkName: "customers" */ "../views/Customers.vue"),
      },
      {
        path: "demands",
        name: "demands",
        component: () =>
          import(/* webpackChunkName: "demands" */ "../views/Demands.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    component: () =>
      import(/* webpackChunkName: "error" */ "../views/Error404.vue"),
  },
];
