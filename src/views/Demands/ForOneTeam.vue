<template>
  <div class="flex gap-2">
    {{ $route.params.team }}

    <DemandAccordion />
  </div>
</template>

<script lang="ts">
import CardTeam from "../../components/Demands/CardTeam.vue";
import api from "../../services/api";
import { useDemandStore } from "../../stores/DemandStore";
import DemandAccordion from "../../components/Demands/DemandAccordion.vue";

const demandStore = useDemandStore();
export default {
  name: "ForTeam",
  components: {
    CardTeam,
    DemandAccordion,
  },

  data() {
    return {};
  },
  created() {
    this.getDemandsByTeam();
  },

  methods: {
    getDemandsByTeam() {
      api.get(`demands/team/${this.$route.params.team}`).then((response) => {
        demandStore.storeDemands(
          response.data.data.map((demand) => ({
            ...demand,
            open: false,
          }))
        );
      });
    },
  },
};
</script>

<style>
.accordion-item {
  border: 1px solid #ccc;
  margin-bottom: 1px;
}

.accordion-title {
  padding: 10px;
  background-color: #f0f0f0;
}

.accordion-content {
  padding: 10px;
  display: none;
  background-color: #fff;
}

.accordion-content[style] {
  display: block;
}
</style>
