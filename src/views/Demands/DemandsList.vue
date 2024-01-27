<template>
  <div class="">
    <div class="flex justify-between mb-4">
      <h1 class="text-center font-bold text-2xl">Demandas</h1>
      <button
        @click="openModal()"
        class="rounded px-3 py-2 bg-blue-600 text-white hover:bg-blue-800 hover:transition-all"
      >
        Adicionar demanda
      </button>
    </div>
    <DemandAccordion v-if="$pinia.state.value.demand.demands" />
    <img
      v-else
      src="../../assets/img/spinner.svg"
      alt=""
      class="w-5 h-5 mr-2"
    />

    <Modal ref="modal" />
  </div>
</template>

<script lang="ts">
import CardTeam from "../../components/Demands/CardTeam.vue";
import { useDemandStore } from "../../stores/DemandStore";
import DemandAccordion from "../../components/Demands/DemandAccordion.vue";
import Modal from "../../components/Demands/AddDemandModal.vue";
import api from "../../services/api";

const demandStore = useDemandStore();
export default {
  name: "DemandsList",
  components: {
    CardTeam,
    DemandAccordion,
    Modal,
  },

  data() {
    return {
      spinner: {
        load_demands: false,
      },
    };
  },
  created() {
    // this.getDemandsByTeam();
  },

  methods: {
    openModal() {
      this.$refs.modal.openModal();
    },
  },
};
</script>

<style></style>
