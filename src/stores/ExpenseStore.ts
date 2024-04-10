import { defineStore } from "pinia";
import api from "../services/api";
import { useApplicationStore } from "./ApplicationStore";
import { Expense } from "../types/Expense";
import { useCompanyStore } from "./CompanyStore";

export const useExpenseStore = defineStore("expense", {
  state: () => ({
    expenses: [] as Expense[],
    totalExpense: 0,
  }),
  actions: {
    storeExpenses(expenses, company, totalExpense) {
      this.expenses = expenses;
      if (company !== null) {
        useCompanyStore().storeCompany(company);
      }
      this.totalExpense = totalExpense;
    },
    getExpenses() {
      useApplicationStore().setIsLoading(true);
      api
        .get("expenses")
        .then((response) => {
          this.storeExpenses(
            response.data.expenses,
            response.data.company,
            response.data.totalExpense
          );
        })
        .catch((e) => alert(e))
        .finally(() => useApplicationStore().setIsLoading(false));
    },
  },
});
