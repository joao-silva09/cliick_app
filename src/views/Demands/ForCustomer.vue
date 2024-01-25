<template>
  <div>
    Por Cliente
    <ul v-for="customer in $pinia.state.value.customer.customers">
      <router-link :to="customer.name">
        {{ customer.name }}
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts">
import { useCustomerStore } from "../../stores/CustomerStore";

const customerStore = useCustomerStore();
export default {
  name: "ForCustomer",
  setup() {
    return {};
  },

  data() {
    return {
      customer: "afsdaf",
      customers: [],
    };
  },
  mounted() {
    customerStore.getCustomers();
    // teams = teamStore.getAllTeams()
  },
  methods: {},
};
</script>

<style></style>
