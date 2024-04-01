import { defineStore } from "pinia";
import api from "../services/api";
import { useApplicationStore } from "./ApplicationStore";
import { Expense } from "../types/Expense";

export const useExpenseStore = defineStore("expense", {
  state: () => ({
    expenses: [] as Expense[],
  }),
  actions: {
    storeExpenses(esxpenses) {
      this.expenses = esxpenses;
    },
    getExpenses() {
      useApplicationStore().setIsLoading(true);
      api
        .get("expenses")
        .then((response) => {
          this.storeExpenses(response.data.data);
        })
        .catch((e) => alert(e))
        .finally(() => useApplicationStore().setIsLoading(false));
    },
  },
});
