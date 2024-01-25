<template>
  <div
    v-for="(demand, index) in $pinia.state.value.demand.demands"
    :key="index"
    class="w-full my-2 rounded border border-gray-300"
  >
    <div
      @click="toggleItem(index)"
      class="p-2 bg-blue-100 cursor-pointer flex items-center justify-between"
    >
      <div>
        {{ demand.id }} - {{ demand.title }} - {{ demand.tasks.length }} tasks
      </div>
      <img
        v-if="demand.open"
        src="../../assets/icons/arrow-down-svgrepo-com.svg"
        alt=""
        class="w-5 h-5 mr-2"
      />
      <img
        v-else
        src="../../assets/icons/arrow-prev-small-svgrepo-com.svg"
        alt=""
        class="w-5 h-5 mr-2"
      />
    </div>

    <!-- Accordion Body -->
    <div v-show="demand.open" class="p-2 bg-white pb-5">
      <div class="flex justify-between mb-5">
        <p class="">
          Descrição:
          <b>
            {{ demand.description }}
          </b>
        </p>
        <p class="">
          Status:
          <b>
            {{ demand.status }}
          </b>
        </p>
        <p class="flex justify-end">
          Data de entrega:
          <b>
            {{ demand.deadline }}
          </b>
        </p>
      </div>
      <h3 class="text-center font-bold">Tasks</h3>
      <div
        v-for="task in demand.tasks"
        class="w-full my-2 rounded border border-gray-300 hover:translate-x-1.5"
      >
        <div
          class="p-2 bg-blue-100 cursor-pointer flex items-center justify-between"
        >
          <router-link
            @click.stop.prevent="getTask(task.id)"
            :to="{
              name: 'task',
              params: {
                task: task.id,
              },
            }"
          >
            {{ task.title }}
            {{ task.description }}
            {{ task.status }}
            {{ task.deadline }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useDemandStore } from "../../stores/DemandStore";
import { useTaskStore } from "../../stores/TaskStore";

const demandStore = useDemandStore();
const taskStore = useTaskStore();
export default {
  name: "DemandAccordion",
  data() {
    return {
      spinner: {
        load_demands: false,
      },
    };
  },
  methods: {
    toggleItem(index) {
      demandStore.$state.demands[index].open =
        !demandStore.$state.demands[index].open;
    },

    getTask(taskId) {
      taskStore.getTask(taskId);
    },
  },
};
</script>

<style></style>
