import { defineStore } from "pinia";
import api from "../services/api";
import { Customer } from "../types/Customer";

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    customers: [] as Customer[],
    currentCustomerToAddDemand: {} as Customer,
  }),
  actions: {
    storeCustomers(customers) {
      this.customers = customers;
    },
    getCustomers() {
      api.get("customers").then((response) => {
        this.storeCustomers(response.data.data);
      });
    },

    setCurrentCustomerToAddDemand(customer) {
      this.currentCustomerToAddDemand = customer;
    },
  },
});
