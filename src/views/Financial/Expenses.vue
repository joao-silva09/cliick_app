<template>
  <div>
    <div class="flex justify-between mb-4 items-center">
      <h2 class="text-xl mb-8">Despesas</h2>
      <button
        class="rounded px-3 py-2 bg-blue-600 text-white hover:bg-blue-800 hover:transition-all"
        @click="openModal()"
      >
        Adicionar Despesa
      </button>
    </div>

    <AddExpenseModal ref="addExpenseModal" />

    <h4>
      Total gasto:
      {{ BRLFormat($pinia.state.value.expense.totalExpense) }}
    </h4>

    <ul class="grid grid-cols-5 gap-4 max-h-[70vh] overflow-auto">
      <li
        v-if="$pinia.state.value.expense.expenses"
        v-for="(expense, index) in $pinia.state.value.expense.expenses"
        :key="index"
        class="bg-red-500 rounded my-2 p-4 text-white"
      >
        <div class="flex justify-between">
          <h3 class="text-lg mb-3">
            {{ expense.title }}
            {{ expense.description }}
            {{ BRLFormat(expense.value) }}
            {{ expense.paid_at }}
          </h3>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useExpenseStore } from "../../stores/ExpenseStore";
import AddExpenseModal from "../../components/Expenses/AddExpenseModal.vue";

const expenseStore = useExpenseStore();
export default {
  name: "Expenses",

  components: {
    AddExpenseModal,
  },

  data() {
    return {
      totalSpend: 0,
    };
  },

  methods: {
    openModal() {
      this.$refs.addExpenseModal.openModal();
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
