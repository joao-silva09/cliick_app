<template>
  <div class="">
    <h1 class="text-center font-bold">Demandas</h1>
    <img
      v-if="spinner.load_demands"
      src="../../assets/img/spinner.svg"
      alt=""
      class="w-5 h-5 mr-2"
    />
    <DemandAccordion v-else/>
  </div>
</template>

<script lang="ts">
import CardTeam from "../../components/Demands/CardTeam.vue";
import api from "../../services/api";
import { useDemandStore } from "../../stores/DemandStore";
import DemandAccordion from "../../components/Demands/DemandAccordion.vue";

const demandStore = useDemandStore();
export default {
  name: "DemandsList",
  components: {
    CardTeam,
    DemandAccordion,
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
   
  },
};
</script>

<style>

</style>
