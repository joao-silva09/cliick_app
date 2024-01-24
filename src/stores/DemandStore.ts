import { defineStore } from "pinia";
import api from "../services/api";

export const useDemandStore = defineStore("demand", {
  state: () => ({
    demands: [] as {
      id: string;
      title: string;
      description: string;
      status: string;
      deadline: Date;
      customer: {};
      teams: [];
    }[],
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
  },
});
