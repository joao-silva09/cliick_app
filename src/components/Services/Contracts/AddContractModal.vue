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
          <h2 class="text-2xl font-semibold mb-4">Adicionar novo serviço</h2>
          <label for="name">Nome do Serviço</label>
          <input
            v-model="service.name"
            type="text"
            id="name"
            class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <label for="description">Descrição</label>
          <input
            v-model="service.description"
            type="text"
            id="description"
            class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <div class="flex justify-between">
            <label for="base_value" class="w-[48%]"
              >Valor Base
              <input
                v-model="service.base_value"
                type="number"
                id="base_value"
                class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </label>
          </div>
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
            @click="createService"
            class="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Salvar
          </button>
        </div>
        <!-- <button @click="console.log()">route</button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import api from "../../../services/api";
import { useApplicationStore } from "../../../stores/ApplicationStore";
import { useContractStore } from "../../../stores/ContractStore";
import "vue-select/dist/vue-select.css";
import { Service } from "../../../types/Service";
import { useCompanyStore } from "../../../stores/CompanyStore";

const contractStore = useContractStore();
export default {
  name: "AddContractModal",
  components: {},
  data() {
    return {
      isOpen: false,
      service: {
        id: "",
        name: "",
        description: "",
        base_value: "",
      } as unknown as Service,
    };
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },

    closeModal() {
      this.isOpen = false;
    },

    createService() {
      const payload = {
        name: this.service.name,
        description: this.service.description,
        base_value: this.service.base_value,
        active: true,
      };

      useApplicationStore().setIsLoading(true);
      api
        .post("services", payload)
        .then((response) => {
          const currentServices = serviceStore.services;
          currentServices?.push(response.data.data);
          serviceStore.storeServices(currentServices);
        })
        .catch((e) => alert(e))
        .finally(() => {
          this.closeModal();
          useApplicationStore().setIsLoading(false);
        });
    },
  },
};
</script>

<style scoped>
/* Estilos específicos da modal aqui, se necessário */
</style>
