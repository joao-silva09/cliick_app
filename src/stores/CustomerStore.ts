import { defineStore } from "pinia";

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    customers: [] as {
      id: string;
      name: string;
      email: string;
      entry_date: Date;
    }[],
  }),
  actions: {
    storeCustomers(customers) {
      this.customers = customers
    }
  },
});
