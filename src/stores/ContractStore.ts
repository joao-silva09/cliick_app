import { defineStore } from "pinia";
import { Contract } from "../types/Contract";

export const useContractStore = defineStore("contract", {
  state: () => ({
    contract: {} as Contract,
    contracts: [] as Contract[],
  }),
  actions: {
    storeContract(contract) {
      this.contract = contract;
    },

    storeContracts(contracts) {
      this.contracts = contracts;
    },
  },
});
