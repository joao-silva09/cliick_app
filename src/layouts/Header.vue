<!-- Header.vue -->
<template>
  <header class="bg-blue-50 p-4 flex justify-between items-center h-[10vh]">
    <!-- Conteúdo do cabeçalho vai aqui -->
    <img src="../assets/img/logo.png" class="w-16" />
    <router-link :to="{ name: 'profile' }">
      <img
        v-if="$pinia.state.value.user.user.profile_photo"
        :src="`http://localhost:8000/storage/${$pinia.state.value.user.user.profile_photo}`"
        alt="Profile Photo"
        class="w-11 rounded-full mb-2 cursor-pointer"
      />
      <img
        v-else
        src="../../assets/img/default-profile-photo.png"
        alt="Profile Photo"
        class="w-11 rounded-full mb-2 cursor-pointer"
      />
    </router-link>
  </header>
</template>

<script>
import cookie from "../services/cookie";
export default {
  name: "Header",
  methods: {
    goToProfile() {
      $router.push("/profile");
    },
  },
};
</script>

<style scoped>
.primary-color {
  background-color: #1b4b73;
}
</style>
