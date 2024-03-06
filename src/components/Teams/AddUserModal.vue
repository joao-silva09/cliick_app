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
          <h2 class="text-2xl font-semibold mb-4">Adicionar novo usuário</h2>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label for="first_name">Nome</label>
              <input
                v-model="user.first_name"
                type="text"
                id="first_name"
                class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label for="last_name">Sobrenome</label>
              <input
                v-model="user.last_name"
                type="text"
                id="last_name"
                class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <label for="email">Email</label>
          <input
            v-model="user.email"
            type="email"
            id="email"
            class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <label for="password">Senha</label>
          <input
            v-model="user.password"
            type="text"
            id="password"
            class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <!-- @update:modelValue="handleAddUser"
            @remove="handleRemoveUser" -->
          <label for="users">Cargo</label>
          <v-select
            v-model="user.user_type"
            :options="userTypesOptions"
            label="label"
            class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id="user_type"
            appendToBody
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
            @click="createUser"
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
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { useUserStore } from "../../stores/UserStore";
import { useApplicationStore } from "../../stores/ApplicationStore";
import { UserTypes } from "../../types/enums";

const userStore = useUserStore();
export default {
  name: "AddUserModal",
  components: {
    vSelect,
  },
  data() {
    return {
      isOpen: false,
      user: {
        first_name: "",
        last_name: "",
        email: "",
        user_type: "",
        password: "",
        company_id: 1,
      },
      userTypesOptions: Object.entries(UserTypes).map(
        ([key, value]) => ({
          label: value,
          value: key,
        })
      ),
    };
  },
  
  methods: {
    openModal() {
      this.isOpen = true;
    },

    closeModal() {
      this.isOpen = false;
      teamStore.storeUsersToAdd(this.$pinia.state.value.user.users);
    },

    createUser() {
      useApplicationStore().setIsLoading(true);

      const payload = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        user_type: this.user.user_type.value,
        password: this.user.password,
        company_id: 1,
      };

      api
        .post("register", payload)
        .then((response) => {
          const currentUsers = userStore.usersAll;
          currentUsers?.push(response.data.data);
          userStore.storeUsersAll(currentUsers);
        })
        .catch((e) => alert(e))
        .finally(() => {
          // teamStore.storeUsersAll(this.$pinia.state.value.user.users);
          useApplicationStore().setIsLoading(false);
        });

      this.closeModal();
    },

    handleAddUser() {
      teamStore.storeUsersToAdd(
        teamStore.usersToAdd.filter((user) => !this.users.includes(user))
      );

      console.log(this.users);
    },

    handleRemoveUser(removedTeam) {
      // Adicionar o time removido de volta à lista de opções gerenciada pelo Pinia
      this.$pinia.state.value.team.usersToAdd.push(removedTeam);
    },

    compararArraysDeObjetos(array1, array2) {
      // Usa a função filter para retornar apenas os objetos que não estão em array2
      const resultado = array1.filter((objeto1) => {
        // Verifica se o objeto não está presente em array2
        return !array2.some((objeto2) =>
          this.compararObjetos(objeto1, objeto2)
        );
      });

      return resultado;
    },

    // Função auxiliar para comparar objetos
    compararObjetos(objeto1, objeto2) {
      // Implemente a lógica de comparação de objetos conforme necessário
      // Aqui é um exemplo simples, você pode ajustar conforme seus requisitos
      return objeto1.id === objeto2.id;
    },
  },
};
</script>

<style scoped>
/* Estilos específicos da modal aqui, se necessário */
</style>
