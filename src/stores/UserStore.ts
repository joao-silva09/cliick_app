import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {} as {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    },
    currentRouteName: "",
  }),
  actions: {
    storeUser(user) {
      this.user = user;
    },
    storeCurrentRouteName(routeName) {
      this.currentRouteName = routeName;
    },
  },
  getters: {},
});
