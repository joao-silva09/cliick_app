import { defineStore } from "pinia";

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
      this.demands = demands
    }
  },
});
