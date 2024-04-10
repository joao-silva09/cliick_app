<template>
  <Doughnut :data="data" :options="options" />
</template>

<script lang="ts">
import { Chart as ChartJS, registerables } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(...registerables);

export default {
  name: "DoughnutChart",
  props: {
    labels: Array,
    data: Array,
    colors: Array,
  },
  components: {
    Doughnut,
  },
  data() {
    return {
      data: {
        labels: this.$props.labels,
        datasets: [
          {
            data: this.$props.data,
            backgroundColor: this.$props.colors,
          },
        ],
      },
      options: {
        responsive: true,
      },
    };
  },
};
</script>
