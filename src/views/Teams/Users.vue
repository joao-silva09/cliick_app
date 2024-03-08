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
        class="rounded border border-gray-100 shadow-md my-2 text-center flex justify-between flex-col"
      >
        <div class="flex justify-center pt-3">
          <img
            v-if="user.profile_photo"
            :src="`https://erp-api.agenciacliick.com.br/default.php/storage/${user.profile_photo}`"
            alt="Profile Photo"
            class="w-[40%] rounded-full mb-2"
          />
          <img
            v-else
            src="../../assets/img/default-profile-photo.png"
            alt="Profile Photo"
            class="w-[40%] rounded-full mb-2"
          />
        </div>
        <h3 class="text-sm mb-8 font-medium">
          {{ user.full_name }}
        </h3>
        <!-- <ActionIconMenu :team="user" /> -->
<!-- 
        <h4 class="text-sm mb-3">
          {{ user.user_type }}
        </h4> -->

        <div class="grid grid-cols-2">
          <a
            :href="`https://wa.me/${user.phone}`"
            target="_blank "
            class="border border-gray-200 cursor-pointer p-2 hover:bg-gray-100 flex justify-center"
            ><img src="../../assets/icons/whatsapp.svg" alt="" class="w-6"
          /></a>
          <a
            :href="`mailto:${user.email}`"
            target="_blank"
            class="border border-gray-200 cursor-pointer p-1 hover:bg-gray-100 flex justify-center"
            ><EnvelopeIcon class="w-6"
          /></a>
        </div>
      </li>
    </ul>

    <Modal ref="modal" />
  </div>
</template>

<script>
import api from "../../services/api";
import Modal from "../../components/Teams/AddUserModal.vue";
import { useApplicationStore } from "../../stores/ApplicationStore";
import { useUserStore } from "../../stores/UserStore";
import { EnvelopeIcon } from "@heroicons/vue/24/outline";

const userStore = useUserStore();
export default {
  name: "Users",

  components: {
    Modal,
    EnvelopeIcon,
  },

  data() {
    return {
      // photoUrl: null,
    };
  },

  methods: {
    getUsers() {
      userStore.getUsersAll();
      // this.photoUrl = ;
    },

    openModal() {
      this.$refs.modal.openModal();
    },
  },

  mounted() {
    this.getUsers();
  },
};
</script>

<style></style>
