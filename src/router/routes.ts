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
        path: "profile",
        name: "profile",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Profile.vue"),
      },
      {
        path: "customers",
        name: "customers",
        component: () =>
          import(/* webpackChunkName: "customers" */ "../views/Customers.vue"),
      },
      {
        path: "teams",
        name: "teams",
        children: [
          {
            path: "",
            name: "allTeams",
            component: () =>
              import(
                /* webpackChunkName: "teams" */ "../views/Teams/Teams.vue"
              ),
          },
          {
            path: "users",
            name: "allUsers",
            component: () =>
              import(
                /* webpackChunkName: "teams" */ "../views/Teams/Users.vue"
              ),
          },
        ],
      },
      {
        path: "tasks",
        name: "tasks",
        children: [
          // {
          //   path: "overview",
          //   name: "overview",
          //   component: () =>
          //     import(
          //       /* webpackChunkName: "Overview" */ "../views/Demands/Overview.vue"
          //     ),
          // },
          {
            path: "my-tasks",
            name: "myTasks",
            component: () =>
              import(
                /* webpackChunkName: "MyTasks" */ "../views/Demands/MyTasks.vue"
              ),
          },
          {
            path: "completed",
            name: "completedTasks",
            component: () =>
              import(
                /* webpackChunkName: "Completed" */ "../views/Demands/Completed.vue"
              ),
          },
          {
            path: "for-team",
            name: "tasksForTeam",
            component: () =>
              import(
                /* webpackChunkName: "forTeam" */ "../views/Demands/ForTeam.vue"
              ),
          },
          {
            path: ":id",
            name: "tasksList",
            component: () =>
              import(
                /* webpackChunkName: "tasksList" */ "../views/Demands/TasksList.vue"
              ),
          },
          {
            path: "for-customer",
            name: "tasksForCustomer",
            component: () =>
              import(
                /* webpackChunkName: "forTeam" */ "../views/Demands/ForCustomer.vue"
              ),
          },
          {
            path: ":task",
            name: "task",
            component: () =>
              import(
                /* webpackChunkName: "forTeam" */ "../views/Tasks/Task.vue"
              ),
          },
          // {
          //   path: "for-customer/:customer",
          //   name: "demandsForCustomer",
          //   component: () =>
          //     import(
          //       /* webpackChunkName: "forTeam" */ "../views/Demands/ForCustomer.vue"
          //     ),
          // },
        ],
      },
      {
        path: "financial",
        name: "financial",
        children: [
          {
            path: "",
            name: "financialDashboard",
            component: () =>
              import(
                /* webpackChunkName: "financialDashboard" */ "../views/Financial/Financial.vue"
              ),
          },
          {
            path: "contracts",
            name: "contracts",
            component: () =>
              import(
                /* webpackChunkName: "contracts" */ "../views/Financial/Contracts.vue"
              ),
          },
          {
            path: "expenses",
            name: "expenses",
            component: () =>
              import(
                /* webpackChunkName: "expenses" */ "../views/Financial/Expenses.vue"
              ),
          },
          {
            path: "debts",
            name: "debts",
            component: () =>
              import(
                /* webpackChunkName: "debts" */ "../views/Financial/Debts.vue"
              ),
          },
        ],
      },
      {
        path: "services",
        name: "servicesRoute",
        children: [
          {
            path: "",
            name: "services",
            component: () =>
              import(
                /* webpackChunkName: "services" */ "../views/Services/Services.vue"
              ),
          },
        ],
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    component: () =>
      import(/* webpackChunkName: "error" */ "../views/Error404.vue"),
  },
];
