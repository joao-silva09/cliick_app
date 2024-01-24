<template>
  <div
    v-for="(demand, index) in $pinia.state.value.demand.demands"
    :key="index"
    class="accordion-item"
  >
    <div @click="toggleItem(index)" class="accordion-title cursor-pointer">
      {{ demand.title }}
    </div>
    <div v-show="demand.open" class="accordion-content">
      {{ demand.description }}
    </div>
  </div>
</template>

<script lang="ts">
import { useDemandStore } from "../../stores/DemandStore";

const demandStore = useDemandStore();
export default {
  name: "DemandAccordion",
  data() {
    return {};
  },
  methods: {
    toggleItem(index) {
      demandStore.$state.demands[index].open =
        !demandStore.$state.demands[index].open;
    },
  },
};
</script>

<style></style>
