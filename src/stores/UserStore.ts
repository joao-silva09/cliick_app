import { defineStore } from "pinia";
import { User } from "../types/User";
import api from "../services/api";
import { useApplicationStore } from "./ApplicationStore";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {} as User,
    users: [] as User[],
    usersAll: [] as User[],
    currentRouteName: "",
  }),
  actions: {
    storeUser(user) {
      this.user = user;
    },

    storeUsersAll(users) {
      this.usersAll = users;
    },

    getUsersAll() {
      useApplicationStore().setIsLoading(true);
      api
        .get("me/all")
        .then((response) => {
          this.storeUsersAll(response.data.data);
        })
        .catch((e) => alert(e))
        .finally(() => useApplicationStore().setIsLoading(false));
    },

    storeUsers(users) {
      this.users = users;
    },

    storeCurrentRouteName(routeName) {
      this.currentRouteName = routeName;
    },
  },
  getters: {},
});
