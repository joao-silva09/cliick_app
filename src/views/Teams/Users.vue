<template>
  <div>
    <div class="flex justify-between mb-4 items-center">
      <h2 class="text-xl mb-8">Usuários</h2>
      <button
        @click="openModal()"
        class="rounded px-3 py-2 bg-blue-600 text-white hover:bg-blue-800 hover:transition-all"
      >
        Adicionar Usuário
      </button>
    </div>

    <ul class="grid grid-cols-5 gap-4 max-h-[70vh] overflow-auto">
      <li
        v-for="(user, index) in $pinia.state.value.user.usersAll"
        :key="index"
        class="bg-[#1B4B73] rounded my-2 p-4 text-white"
      >
        <div class="flex justify-between">
          <h3 class="text-lg mb-3">
            {{ user.full_name }}
          </h3>
          <!-- <ActionIconMenu :team="user" /> -->
        </div>
        <h4 class="text-sm mb-3">
          {{ user.user_type }}
        </h4>
        <!-- <p v-for="user in team.users">{{ user.full_name }}</p> -->
      </li>
    </ul>

    <Modal ref="modal" />
  </div>
</template>

<script>
import api from "../../services/api";
import { useTeamStore } from "../../stores/TeamStore";
import Modal from "../../components/Teams/AddUserModal.vue";
import ActionIconMenu from "../../components/Teams/ActionIconMenu.vue";
import { useApplicationStore } from "../../stores/ApplicationStore";
import { useUserStore } from "../../stores/UserStore";

const userStore = useUserStore();
export default {
  name: "Users",

  components: {
    ActionIconMenu,
    Modal,
  },

  data() {
    return {};
  },

  created() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      userStore.getUsersAll();
    },

    openModal() {
      this.$refs.modal.openModal();
    },
  },
};
</script>

<style></style>
