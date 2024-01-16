export const routes = [
  {
    path: "/",
    name: "customers",
    alias: "/customers",
      component: () => import(/* webpackChunkName: "home" */ "../views/Customers.vue"),
  },
  {
    path: "/",
    name: "teams",
    alias: "/teams",
      component: () => import(/* webpackChunkName: "home" */ "../views/Teams.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    // component: () => import(/* webpackChunkName: "error" */ "../views/Error404.vue")
  },
];
