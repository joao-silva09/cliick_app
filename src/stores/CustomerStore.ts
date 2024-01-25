import { defineStore } from "pinia";
import api from "../services/api";

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
    },
    getCustomers() {
      api.get('customers').then((response) => {
        this.storeCustomers(response.data.data);
      })
    }
  },
});
