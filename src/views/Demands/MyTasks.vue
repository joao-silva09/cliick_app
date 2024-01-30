<template>
  <div>
    <div class="flex justify-between items-center mb-3">
      <h2 class="text-xl">Minhas Tarefas</h2>
    </div>
    <div class="flex gap-3 flex-col">
      <div
        v-for="task in $pinia.state.value.task.tasks"
        :class="
          new Date(task.deadline) > new Date()
            ? 'bg-cyan-100'
            : 'bg-red-200'
        "
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
