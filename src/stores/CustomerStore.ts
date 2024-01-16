import { defineStore } from "pinia";

export const useCustomerStore = defineStore("customer", {
  state: () => ({
    attribute: 0,
  }),
  actions: {
    funcao() {
      this.attribute += 1;
    },
    getters: {
      getter() {
        return "attribute" + this.attribute;
      },
    },
  },
});
