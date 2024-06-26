<!-- Modal.vue -->
<template>
  <div v-if="isOpen" class="fixed inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Máscara de fundo -->
      <div class="fixed inset-0 transition-opacity" @click="closeModal">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- Conteúdo da modal -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
      <!-- Alinha ao centro no sm -->
      &#8203;
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Conteúdo interno da modal -->
        <div class="bg-white p-4">
          <h2 class="text-2xl font-semibold mb-4">Adicionar nova tarefa</h2>
          <label for="title">Título</label>
          <input
            v-model="task.title"
            type="text"
            id="title"
            class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <label for="description">Descrição</label>
          <input
            v-model="task.description"
            type="text"
            id="description"
            class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <label for="deadline">Prazo</label>
          <input
            v-model="task.deadline"
            type="date"
            id="deadline"
            class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <label for="customer">Cliente</label>
          <v-select
            v-model="task.customer"
            :options="$pinia.state.value.customer.customers"
            label="name"
            id="customer"
            class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <label for="teams">Times envolvidos</label>
          <v-select
            v-model="task.teams"
            :options="$pinia.state.value.team.teams"
            label="name"
            multiple
            id="teams"
            class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            @update:modelValue="handleAddTeam"
            @remove="handleRemoveTeam"
            appendToBody
          />

          <label for="usersIds">Usuários</label>
          <v-select
            v-model="task.users"
            :options="$pinia.state.value.task.usersToAddToTheTask"
            label="full_name"
            multiple
            class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <!-- Botão para fechar a modal -->
        <div class="p-4 flex justify-end gap-2">
          <button
            @click="closeModal"
            class="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Fechar
          </button>
          <button
            @click="createTasks"
            class="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { useUserStore } from "../../stores/UserStore";
// import { useDemandStore } from "../../stores/DemandStore";
// import { Task } from "../../types/Task";
import { useApplicationStore } from "../../stores/ApplicationStore";
import { TaskStatus } from "../../types/Enums";
import { useTaskStore } from "../../stores/TaskStore";

const userStore = useUserStore();
const taskStore = useTaskStore();
// const demandStore = useDemandStore();
export default {
  name: "AddTaskModal",
  components: {
    vSelect,
  },
  props: {
    demandId: Number,
    demandIndex: Number,
  },
  data() {
    return {
      isOpen: false,
      task: {
        title: "",
        description: "",
        deadline: null,
        customer: {},
        teams: [],
        users: [],
      },
    };
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },

    closeModal() {
      this.isOpen = false;
    },

    createTasks() {
      useApplicationStore().setIsLoading(true);
      const payload = {
        title: this.task.title,
        description: this.task.description,
        status: TaskStatus.Pending,
        deadline: this.task.deadline,
        customer_id: this.task.customer.id,
        teams_ids: this.task.teams.map((team) => team.id),
        users_ids: [
          // userStore.user.id,
          ...this.task.users.map((user) => user.id),
        ],
      };

      api
        .post("tasks", payload)
        .then((response) => {
          // const taskList: any[] =
          //   demandStore.demands![
          const taskList = taskStore.tasks ?? [];
          taskList.push(response.data.data);
          taskStore.storeTasks(taskList);
        })
        .catch((e) => console.log(e))
        .finally(() => {
          this.closeModal();
          useApplicationStore().setIsLoading(false);
        });
    },
    handleAddTeam() {
      taskStore.storeTeams(
        taskStore.teams.filter((team) => !this.task.teams.includes(team))
      );

      console.log(this.task.teams);
    },

    handleRemoveTeam(removedTeam) {
      // Adicionar o time removido de volta à lista de opções gerenciada pelo Pinia
      this.$pinia.state.value.team.teams.push(removedTeam);

      console.log(this.task.teams);
    },
  },
  watch: {
    "task.teams": function (newTeams, oldTeams) {
      // Identifica o time removido
      const removedTeam = oldTeams.find((team) => !newTeams.includes(team));

      if (removedTeam) {
        // Adiciona o time removido de volta à lista de opções gerenciada pelo Pinia
        this.$pinia.state.value.team.teams.push(removedTeam);
        // Ordena a lista alfabeticamente
        this.$pinia.state.value.team.teams.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
    },
  },
};
</script>

<style scoped></style>
