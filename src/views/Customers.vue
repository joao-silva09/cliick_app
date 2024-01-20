<template>
  <div style="height: 300px">
    <h1 class="text-center mt-5">Clientes</h1>

    <ul>
      <li v-for="customer in customers" :key="customer.id">
        {{ customer.name }}
      </li>
    </ul>

    <div class="relative"></div>
  </div>
</template>

<script>
import api from "../services/api";

import { useCustomerStore } from "../stores/CustomerStore";
const store = useCustomerStore();

export default {
  name: "Customers",

  components: {},

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
  },
};
</script>

<style></style>
