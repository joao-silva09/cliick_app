import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {} as {
      id: string;
      first_name: string;
      last_name: string;
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
