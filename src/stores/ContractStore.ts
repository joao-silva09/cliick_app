import { defineStore } from "pinia";
import { Contract } from "../types/Contract";

export const useContractStore = defineStore("contract", {
  state: () => ({
    contracts: [] as Contract[],
  }),
  actions: {
    storeContracts(contracts) {
      this.contracts = contracts;
    },
  },
});
