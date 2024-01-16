<template>
    <div style="height: 300px">
      <h1 class="text-center mt-5">Customers</h1>
    </div>
  </template>
  
  <script>

  import { useCustomerStore } from '../stores/CustomerStore';
  const store = useCustomerStore();
  
  export default {
    name: "Customers",
  
    components: {
    },
  
    data() {
      return {
      };
    },
  
    methods: {
    },
  };
  </script>
  
  <style></style>
  