<template>
  <div>
    <h2 class="text-xl mb-8">Tarefas Por Cliente</h2>
    <!-- <button
        @click="openModal()"
        class="rounded px-3 py-2 bg-blue-600 text-white hover:bg-blue-800 hover:transition-all"
      >
        Adicionar demanda
      </button> -->
    <ul class="flex gap-4">
      <li
        class="border border-gray-600 p-4 hover:bg-sky-700 cursor-pointer"
        v-for="customer in $pinia.state.value.customer.customers"
        @click.stop.prevent="getTasksByCustomer(customer.id)"
      >
        <div>
          {{ customer.name }}
        </div>
      </li>
    </ul>
    <!-- <Modal ref="modal" /> -->
  </div>
</template>

<script>
import api from "../../services/api";
import { useCustomerStore } from "../../stores/CustomerStore";
import { useTaskStore } from "../../stores/TaskStore";
// import Modal from "../../components/Tasks/AddTaskModal.vue";
import { useTeamStore } from "../../stores/TeamStore";
import { useApplicationStore } from "../../stores/ApplicationStore";

const customerStore = useCustomerStore();
const taskStore = useTaskStore();
export default {
  name: "ForCustomer",
  components: {
    // Modal,
  },
  setup() {
    return {};
  },

  data() {
    return {};
  },
  mounted() {
    customerStore.getCustomers();
    useTeamStore().getTeams();
    taskStore.clearTeamsAndCustomer();
  },
  methods: {
    getTasksByCustomer(customerId) {
      useApplicationStore().setIsLoading(true);
      api
        .get(`tasks/customer/${customerId}`)
        .then((response) => {
          taskStore.storeTasksByCustomer(response.data.data);
        })
        .catch((e) => {
          alert(e);
          console.log(e);
        })
        .finally(() => {
          this.$router.push({
            name: "tasksList",
            params: {
              id: customerId,
            },
          });
          useApplicationStore().setIsLoading(false);
        });
    },

    // openModal() {
    //   this.$refs.modal.openModal();
    // },
  },
};
</script>

<style></style>
