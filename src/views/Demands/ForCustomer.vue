<template>
  <div>
    <ul class="flex gap-4">
      <li
        class="border border-gray-600 p-4 hover:bg-sky-700 cursor-pointer"
        v-for="customer in $pinia.state.value.customer.customers"
      >
        <div @click.stop.prevent="getDemandsByCustomer(customer.id)">
          {{ customer.name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import api from "../../services/api";
import { useCustomerStore } from "../../stores/CustomerStore";
import { useDemandStore } from "../../stores/DemandStore";

const customerStore = useCustomerStore();
const demandStore = useDemandStore();
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
  },
  methods: {
    getDemandsByCustomer(customerId) {
      api
        .get(`demands/customer/${customerId}`)
        .then((response) => {
          demandStore.storeDemands(response.data.data);
        })
        .catch((e) => alert(e))
        .finally(() =>
          this.$router.push({
            name: "demandsList",
            params: {
              id: customerId,
            },
          })
        );
    },
  },
};
</script>

<style></style>
