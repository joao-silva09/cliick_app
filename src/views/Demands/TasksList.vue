<template>
  <div>
    <div class="flex justify-between mb-4">
      <h1 class="text-center font-bold text-2xl">
        Tarefas de
        {{
          $pinia.state.value.task.customerWithTasks.name ??
          $pinia.state.value.task.teamWithTasks.name
        }}
      </h1>
      <button
        @click="openModal()"
        class="rounded px-3 py-2 bg-blue-600 text-white hover:bg-blue-800 hover:transition-all"
      >
        Adicionar tarefa
      </button>
    </div>
    <div v-if="$pinia.state.value.task.tasks" class="flex gap-3 flex-col">
      <div
        v-for="(task, index) in $pinia.state.value.task.tasks"
        :key="index"
        :class="getTaskColor(task, index)"
        class="w-full border rounded border-gray-600 p-2 bg-cyan-100 flex justify-between cursor-pointer hover:translate-x-2 hover:transition-all"
        @click.stop.prevent="getTask(task.id)"
      >
        <div>
          [{{ task.customer?.name }}]
          {{ task.title }}
        </div>
        <div class="flex gap-3">
          <div>
            {{ new Date(task.deadline).toLocaleDateString() }}
          </div>
        </div>
      </div>
    </div>
    <img
      v-else
      src="../../assets/img/spinner.svg"
      alt=""
      class="w-5 h-5 mr-2"
    />
    <AddTaskModal ref="modal" />
  </div>
</template>

<script>
import CardTeam from "../../components/Demands/CardTeam.vue";
import AddTaskModal from "../../components/Tasks/AddTaskModal.vue";
import { TaskStatus } from "../../types/Enums";
import { useTaskStore } from "../../stores/TaskStore";
import { useUserStore } from "../../stores/UserStore";
import { useApplicationStore } from "../../stores/ApplicationStore";
import api from "../../services/api";

const taskStore = useTaskStore();
export default {
  name: "TasksList",
  components: {
    AddTaskModal,
    CardTeam,
  },

  data() {
    return {
      spinner: {
        load_demands: false,
      },
    };
  },
  created() {
    this.getUsers()
  },

  methods: {
    openModal() {
      this.$refs.modal.openModal();
    },

    getUsers() {
      useApplicationStore().setIsLoading(true);
      api
        .get("me/all")
        .then((response) => {
          useUserStore().storeUsers(response.data.data);
          taskStore.storeUsersToAddToTheTask(response.data.data);
        })
        .catch((e) => alert(e))
        .finally(() => useApplicationStore().setIsLoading(false));
    },

    // getTaskColor(task: Task, index) {
    getTaskColor(task, index) {
      if (task.status === TaskStatus.Completed) {
        return "bg-green-400";
      } else if (task.status === TaskStatus.AwaitingApproval) {
        return "bg-yellow-400";
      } else if (new Date(task.deadline) > new Date()) {
        return "bg-blue-300";
      } else {
        return "bg-red-400";
      }
    },

    getTask(taskId) {
      taskStore.getTask(taskId, this.$router);
    },
  },
};
</script>

<style></style>
