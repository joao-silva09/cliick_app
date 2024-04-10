import { defineStore } from "pinia";
import { Service } from "../types/Service";

export const useServiceStore = defineStore("service", {
  state: () => ({
    services: [] as Service[],
  }),
  actions: {
    storeServices(services) {
      this.services = services;
    },
  },
});
