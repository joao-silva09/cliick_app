<template>
  <div style="height: 300px">
    <div class="flex justify-between mb-4 items-center">
      <h2 class="text-xl mb-8">Clientes Ativos</h2>
      <button
        @click="openModal()"
        class="rounded px-3 py-2 bg-blue-600 text-white hover:bg-blue-800 hover:transition-all"
      >
        Adicionar Cliente
      </button>
    </div>
    <TableCustomers v-if="$pinia.state.value.customer.customers.length !== 0" />
    <h3 v-else class="text-center">Nenhum cliente cadastrado</h3>

    <Modal ref="modal" />
  </div>
</template>

<script>
import api from "../../services/api";
import { useCustomerStore } from "../../stores/CustomerStore";
import Modal from "../../components/Customers/AddCustomerModal.vue";
import TableCustomers from "../../components/Customers/TableCustomers.vue";
import { useApplicationStore } from "../../stores/ApplicationStore";
const store = useCustomerStore();

export default {
  name: "Customers",

  components: {
    Modal,
    TableCustomers
  },

  data() {
    return {};
  },

  created() {
    store.getCustomers();
  },

  methods: {
    openModal() {
      this.$refs.modal.openModal();
    },
  },
};
</script>

<style></style>
