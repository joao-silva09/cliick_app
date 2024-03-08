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
          <h2 class="text-2xl font-semibold mb-4">Atualizar foto do perfil</h2>
          <div>
            <form @submit.prevent="updateProfilePhoto">
              <label for="profilePhoto">Escolha uma nova foto de perfil:</label>
              <input
                type="file"
                id="profilePhoto"
                @change="fileChanged"
                class="w-full"
              />

              <div class="pt-4 flex justify-end gap-2">
                <!-- Botão para fechar a modal -->
                <button
                  @click="closeModal"
                  class="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  class="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Atualizar Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import { useApplicationStore } from "../../stores/ApplicationStore";
import { useUserStore } from "../../stores/UserStore";
import axios from "axios";
import cookie from "../../services/cookie";

export default {
  name: "UpdateProfilePhotoModal",
  data() {
    return {
      isOpen: false,
      profilePhoto: null,
    };
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },

    closeModal() {
      this.isOpen = false;
    },

    fileChanged(event) {
      // Armazena o primeiro arquivo selecionado
      this.profilePhoto = event.target.files[0];
    },

    updateProfilePhoto() {
      useApplicationStore().setIsLoading(true);
      const formData = new FormData();
      formData.append("profile_photo", this.profilePhoto);

      axios
        .post(
          `${import.meta.env.VITE_API_BASE_URL}/api/me/profile-photo`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: cookie.getToken(),
            },
          }
        )
        .then((response) => {
          useUserStore().storeProfilePhoto(response.data.photo_url);
        })
        .catch((error) => alert(error))
        .finally(() => {
          useApplicationStore().setIsLoading(false);
          this.closeModal();
        });
      // api
      //   .post("me/profile-photo", { profile_photo: this.profilePhoto })
      //   .then((response) => {
      //     userStore.user.profile_photo = response.data.data.photo_url;
      //   });
    },
  },
};
</script>

<style scoped></style>
useUserStore,useApplicationStore,
