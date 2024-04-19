<template>
  <div>
    <BackIcon @click="goBack()" class="w-5 h-5 text-blue-600 cursor-pointer" />

    <div>
      <h3 class="text-lg text-center font-semibold">
        Contrato de {{ contract.customer.name }}
      </h3>

      <img
        v-if="contract.customer.customer_logo"
        :src="`${baseUrl}/storage/${contract.customer.customer_logo}`"
        alt="Profile Photo"
        class="w-32 h-32 rounded-full mb-2 cursor-pointer"
        @click="openUpdateProfilePhotoModal()"
      />
      <img
        v-else
        src="../assets/img/default-profile-photo.png"
        alt="Profile Photo"
        class="w-32 h-32 rounded-full mb-2 cursor-pointer"
        @click="openUpdateProfilePhotoModal()"
      />
    </div>
  </div>
</template>

<script>
import { useContractStore } from "../../stores/ContractStore";
import api from "../../services/api.ts";
import { useApplicationStore } from "../../stores/ApplicationStore";
import { ArrowLeftIcon as BackIcon } from "@heroicons/vue/24/outline";

const contractStore = useContractStore();
export default {
  name: "Contracts",

  components: {
    BackIcon,
  },

  data() {
    return {
      contract: this.$pinia.state.value.contract.contract,
      baseUrl: import.meta.env.VITE_API_BASE_URL,
    };
  },

  created() {},

  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
