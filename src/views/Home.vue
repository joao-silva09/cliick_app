<template>
  <div class="w-full">
    <h2 class="text-xl mb-8">Página inicial</h2>

    <div class="flex">
      <div class="rounded shadow-md w-[30%] p-3">
        <h4 class="mb-4">Últimas mensagens enviadas</h4>
        <ul v-for="(message, index) in $pinia.state.value.message.messages">
          <li
            :key="index"
            class="border-b p-3 text-ellipsis overflow-hidden cursor-pointer hover:bg-gray-200"
            @click="getTask(message.task.id)"
          >
            <div class="flex justify-between gap-8">
              <p class="text-[11px]">
                {{ new Date(message.created_at).toLocaleDateString() }}
              </p>
              <p class="text-sm truncate">{{ message.task.title }}</p>
            </div>
            <div>
              <p v-html="message.message" class="h-4"></p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Tasks -->
      <div class="rounded shadow-md w-[30%] p-3">
        <h4 class="mb-4">Tarefas em aberto</h4>
        <DoughnutChart
          v-if="!isLoading"
          :labels="['Pendente', 'Em Atraso']"
          :colors="['yellow', 'red']"
          :data="[
            $pinia.state.value.task.pendingTasks,
            $pinia.state.value.task.overdueTasks,
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";
import { useApplicationStore } from "../stores/ApplicationStore";
import { useMessageStore } from "../stores/MessageStore";
import { useTaskStore } from "../stores/TaskStore";
import DoughnutChart from "../components/Charts/DoughnutChart.vue";

const taskStore = useTaskStore();
const messageStore = useMessageStore();
export default {
  name: "Home",

  components: {
    DoughnutChart,
  },

  data() {
    return {
      isLoading: false,
      pendingTasks: this.$pinia.state.value.task.pendingTasks,
      overdueTasks: this.$pinia.state.value.task.overdueTasks,
    };
  },
  created() {
    this.getSentMessages();
    this.getMyTasks();
  },

  methods: {
    getSentMessages() {
      useApplicationStore().setIsLoading(true);
      api
        .get("messages/user")
        .then((response) => {
          const messages = response.data.data;
          messageStore.storeMessages(messages.slice(0, 5));
        })
        .catch((e) => alert(e))
        .finally(() => {
          useApplicationStore().setIsLoading(false);
        });
    },
    getMyTasks() {
      this.isLoading = true;
      api
        .get(`tasks`)
        .then((response) => {
          taskStore.storeTasks(response.data.data);
          taskStore.storePendingTasks(
            response.data.data.filter(
              (task) => new Date(task.deadline) > new Date()
            ).length
          );
          taskStore.storeOverdueTasks(
            response.data.data.filter(
              (task) => new Date(task.deadline) <= new Date()
            ).length
          );
          this.isLoading = false;
        })
        .catch((e) => alert(e));
    },

    getTask(taskId) {
      taskStore.getTask(taskId, this.$router);
    },
  },
};
</script>

<style></style>
