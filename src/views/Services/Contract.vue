<template>
  <div>
    <BackIcon @click="goBack()" class="w-5 h-5 text-blue-600 cursor-pointer" />

  </div>
</template>

<script>
import { useContractStore } from "../../stores/ContractStore";
import { ContractStatus } from "../../types/Enums";
import AddContractModal from "../../components/Services/Contracts/AddContractModal.vue";
import api from "../../services/api.ts";
import { useApplicationStore } from "../../stores/ApplicationStore";
import { ArrowLeftIcon as BackIcon } from "@heroicons/vue/24/outline";

const contractStore = useContractStore();
export default {
  name: "Contracts",

  components: {
    AddContractModal,
    BackIcon,
  },

  data() {
    return {
      totalSpend: 0,
      baseUrl: import.meta.env.VITE_API_BASE_URL,
    };
  },

  created() {
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
