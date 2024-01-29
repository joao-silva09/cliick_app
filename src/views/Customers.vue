<template>
  <div style="height: 300px">
    <h1 class="text-center mt-5">Clientes</h1>
    <button
      @click="openModal()"
      class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-800 transition-all float-right"
    >
      Adicionar cliente
    </button>

    <ul>
      <li
        v-for="customer in customers"
        :key="customer.id"
        class="bg-gray-100 my-2"
      >
        {{ customer.name }} - {{ customer.email }} - {{ customer.entry_date }}
      </li>
    </ul>

    <Modal ref="modal" />
  </div>
</template>

<script lang="ts">
import api from "../services/api";
import { useCustomerStore } from "../stores/CustomerStore";
import Modal from "../components/Customers/AddCustomerModal.vue";
const store = useCustomerStore();

export default {
  name: "Customers",

  components: {
    Modal,
  },

  data() {
    return {
      customers: [],
    };
  },

  created() {
    this.getCustomers();
  },

  methods: {
    getCustomers() {
      api.get("customers").then((response) => {
        this.customers = response.data.data;
        store.storeCustomers(response.data.data);
      });
    },

    openModal() {
      this.$refs.modal.openModal();
    },
  },
};
</script>

<style></style>
