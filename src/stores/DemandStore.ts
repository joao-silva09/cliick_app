import { defineStore } from "pinia";
import api from "../services/api";
import { Demand } from "../types/Demand";
import { Task } from "../types/Task";
import { User } from "../types/User";

export const useDemandStore = defineStore("demand", {
  state: () => ({
    demands: [] as Demand[],
    tasks: [] as Task[],
    usersToAdd: [] as User[],
    demandIndex: Number
  }),
  actions: {
    storeDemands(demands) {
      this.demands = demands;
    },

    getDemands() {
      api.get("demands").then((response) => {
        this.storeDemands(response.data.data);
      });
    },

    storeTasks(tasks) {
      this.demands[Number(this.$state.demandIndex)].tasks = tasks;
    },

    storeUsersToAdd(users) {
      this.usersToAdd = users;
    },

    storeDemandIndex(index) {
      this.demandIndex = index;
    },
  },
});
