<template>
  <div style="height: 300px">
    <div class="flex gap-5 text-white">
      <div class="bg-green-600 w-[40%] rounded p-4 shadow-md">
        <h4 class="font-semibold text-xl mb-6">Ganhos</h4>

        <p class="text-4xl font-bold">R$ 4.000,00</p>
      </div>
      <div class="bg-red-600 w-[40%] rounded p-4 shadow-md">
        <h4 class="font-semibold text-xl mb-4">Gastos</h4>

        <p class="text-4xl font-bold">
          {{ BRLFormat($pinia.state.value.expense.totalExpense) }}
        </p>
      </div>
      <div class="bg-gray-50 w-[40%] rounded p-4 shadow-md"></div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import { useExpenseStore } from "../../stores/ExpenseStore";

const expenseStore = useExpenseStore();
export default {
  name: "Financial",

  data() {
    return {};
  },

  created() {
    this.getExpenses();
  },

  methods: {
    getExpenses() {
      expenseStore.getExpenses();
    },

    BRLFormat(amount) {
      return amount.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    },
  },
};
</script>

<style></style>
