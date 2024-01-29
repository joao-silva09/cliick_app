<template>
  <div>
    <div class="flex justify-between items-center mb-3">
      <h2 class="text-xl">minhas tarefas</h2>
      <button class="bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-800">Criar Tarefa</button>
    </div>
    <div class="flex gap-3 flex-col">
      <div
        v-for="task in $pinia.state.value.task.tasks"
        class="w-full border rounded border-gray-600 p-2 bg-cyan-100 flex justify-between cursor-pointer hover:translate-x-2 hover:transition-all"
        @click.stop.prevent="getTask(task.id)"
      >
        <div>
          [{{ task.demand?.customer?.name }}]
          {{ task.title }}
        </div>
        <div>
          {{ new Date(task.deadline).toLocaleDateString() }}
        </div>
        <div>
          {{ task.demand.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useTaskStore } from "../../stores/TaskStore";

const taskStore = useTaskStore();
export default {
  name: "MyTasks",
  data() {
    return {};
  },
  created() {
    taskStore.getMyTasks();
  },
  methods: {
    getTask(taskId: Number) {
      taskStore.getTask(taskId, this.$router);
    },
  },
};
</script>

<style></style>
