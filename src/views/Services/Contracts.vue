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

    <AddContractModal ref="addContractModal" />

    <div
      v-if="$pinia.state.value.contract.contracts.length !== 0"
      class="grid grid-cols-4 gap-4"
    >
      <div
        v-for="(contract, index) in $pinia.state.value.contract.contracts"
        class="max-w-sm rounded overflow-hidden shadow-lg bg-white p-2 flex flex-col items-center"
      >
        <img
          class="w-24 rounded-full"
          :src="`${baseUrl}/storage/${contract.customer.customer_logo}`"
          alt="Imagem do Serviço"
        />
        <div class="px-6 py-4 w-full">
          <div class="font-bold text-xl mb-2">{{ contract.customer.name }}</div>
          <p class="text-gray-700 text-sm">
            Período: {{ new Date(contract.start_date).toLocaleDateString() }} -
            {{ new Date(contract.end_date).toLocaleDateString() }}
          </p>
        </div>
        <div class="px-6 pt-4 pb-2 flex items-center justify-between w-full">
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
            :class="getContractStatusColor(contract.status, index)"
            >{{ contract.status }}</span
          >
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="getContract(contract.id)"
          >
            Saiba mais
          </button>
        </div>
      </div>
    </div>
    <h3 v-else class="text-center">Nenhum contrato cadastrado</h3>
  </div>
</template>

<script>
import { useContractStore } from "../../stores/ContractStore";
import { ContractStatus } from "../../types/Enums";
import AddContractModal from "../../components/Services/Contracts/AddContractModal.vue";
import api from "../../services/api.ts";
import { useApplicationStore } from "../../stores/ApplicationStore";

const contractStore = useContractStore();
export default {
  name: "Contracts",

  components: {
    AddContractModal,
  },

  data() {
    return {
      totalSpend: 0,
      baseUrl: import.meta.env.VITE_API_BASE_URL,
    };
  },

  created() {
    this.getContracts();
  },

  methods: {
    openModal() {
      this.$refs.addContractModal.openModal();
    },

    getContracts() {
      useApplicationStore().setIsLoading(true);
      api
        .get("contracts")
        .then((response) => {
          contractStore.storeContracts(response.data.data);
        })
        .catch((e) => alert(e))
        .finally(() => useApplicationStore().setIsLoading(false));
    },

    getContract(id) {
      useApplicationStore().setIsLoading(true);
      api
        .get(`contracts/${id}`)
        .then((response) => {
          contractStore.storeContracts(response.data.data);
        })
        .catch((e) => alert(e))
        .finally(() => {
          this.$router.push({
              name: "servicesContract",
              params: {
                id: id,
              },
            });
          useApplicationStore().setIsLoading(false);
        });
    },

    getContractStatusColor(status) {
      if (status === ContractStatus.Active) {
        return "bg-green-500 text-white";
      } else if (status === ContractStatus.Completed) {
        return "bg-yellow-500 text-white";
      } else if (status === ContractStatus.Canceled) {
        return "bg-red-500 text-white";
      }
    },
  },
};
</script>

<style></style>
