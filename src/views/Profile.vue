<template>
  <div class="flex justify-center">
    <div class="flex justify-center gap-8 flex-col items-center w-100">
      <img
        v-if="$pinia.state.value.user.user.profile_photo"
        :src="`${import.meta.env.VITE_API_BASE_URL}/storage/${$pinia.state.value.user.user.profile_photo}`"
        alt="Profile Photo"
        class="w-32 h-32 rounded-full mb-2 cursor-pointer"
        @click="openUpdateProfilePhotoModal()"
      />
      <img
        v-else
        src="../assets/img/default-profile-photo.png"
        alt="Profile Photo"
        class="w-32 h-32 rounded-full mb-2 cursor-pointer"
        @click="openUpdateProfilePhotoModal()"
      />

      <div class="w-full gap-4">
        <div class="flex gap-4">
          <input
            type="text"
            v-model="$pinia.state.value.user.user.first_name"
            class="px-2 block w-[50%] rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <input
            type="text"
            v-model="$pinia.state.value.user.user.last_name"
            class="px-2 block w-[50%] rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <input
          type="text"
          v-model="$pinia.state.value.user.user.email"
          class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <input
          type="text"
          v-model="$pinia.state.value.user.user.phone"
          class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <UpdateProfilePhotoModal ref="updateProfilePhotoModal" />
    </div>
  </div>
</template>

<script>
import UpdateProfilePhotoModal from "../components/Profile/UpdateProfilePhotoModal.vue";

export default {
  name: "Profile",
  data() {
    return {};
  },
  components: {
    UpdateProfilePhotoModal,
  },
  methods: {
    openUpdateProfilePhotoModal() {
      this.$refs.updateProfilePhotoModal.openModal();
    },
  },
};
</script>

<style></style>
