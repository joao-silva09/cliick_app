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
          <h2 class="text-2xl font-semibold mb-4">Adicionar nova demanda</h2>
          <label for="title">Título</label>
          <input
            v-model="demand.title"
            type="text"
            id="title"
            class="bg-gray-300 py-1 px-2 placeholder-gray-500 text-gray-700 font-light rounded-sm focus:outline-none block w-full"
          />

          <label for="description">Descrição</label>
          <input
            v-model="demand.description"
            type="text"
            id="description"
            class="bg-gray-300 py-1 px-2 placeholder-gray-500 text-gray-700 font-light rounded-sm focus:outline-none block w-full"
          />

          <label for="status">Status</label>
          <input
            v-model="demand.status"
            type="text"
            id="status"
            class="bg-gray-300 py-1 px-2 placeholder-gray-500 text-gray-700 font-light rounded-sm focus:outline-none block w-full"
          />

          <label for="deadline">Prazo</label>
          <input
            v-model="demand.deadline"
            type="date"
            id="deadline"
            class="bg-gray-300 py-1 px-2 placeholder-gray-500 text-gray-700 font-light rounded-sm focus:outline-none block w-full"
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
            @click="createDemand"
            class="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from "../../services/api";
export default {
  data() {
    return {
      isOpen: false,
      demand: {
        title: "",
        description: "",
        status: "",
        deadline: null,
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

    createDemand() {
      const payload = {
        title: this.demand.title,
        description: this.demand.description,
        status: this.demand.status,
        deadline: this.demand.deadline,
        customer_id: 1,
        teams_ids: [1],
      };

      api.post("demands", payload).then((response) => {
        console.log(response);
      });

      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* Estilos específicos da modal aqui, se necessário */
</style>
