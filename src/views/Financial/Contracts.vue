<template>
  <div>
    <div class="flex justify-between mb-4 items-center">
      <h2 class="text-xl mb-8">Contratos</h2>
      <button
        class="rounded px-3 py-2 bg-blue-600 text-white hover:bg-blue-800 hover:transition-all"
        @click="openModal()"
      >
        Adicionar Contrato
      </button>
    </div>

    <AddExpenseModal ref="addExpenseModal" />

    <div v-if="$pinia.state.value.contract.contracts.length !== 0">
      <h4>
        Total gasto:
        {{ BRLFormat($pinia.state.value.expense.totalExpense) }}
      </h4>

      <ul class="grid grid-cols-5 gap-4 max-h-[70vh] overflow-auto">
        <li
          v-if="$pinia.state.value.contract.contracts"
          v-for="(contract, index) in $pinia.state.value.contract.contracts"
          :key="index"
          class="bg-red-500 rounded my-2 p-4 text-white"
        >
          <div class="flex justify-between">
            <h3 class="text-lg mb-3">
              {{ contract.start_date }}
              {{ contract.end_date }}
              {{ contract.status }}
            </h3>
          </div>
        </li>
      </ul>
    </div>
    <h3 v-else class="text-center">Nenhum contrato cadastrado</h3>
  </div>
</template>

<script>
import { useContractStore } from "../../stores/ContractStore";
import AddExpenseModal from "../../components/Expenses/AddExpenseModal.vue";
import api from "../../services/api.ts";

const contractStore = useContractStore();
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

  created() {
    this.getContracts();
  },

  methods: {
    openModal() {
      this.$refs.addExpenseModal.openModal();
    },

    getContracts() {
      api.get("contracts").then((response) => {
        contractStore.storeContracts(response.data.data);
      })
    }
  },
};
</script>

<style></style>
