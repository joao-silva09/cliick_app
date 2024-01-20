<!-- Header.vue -->
<template>
  <header class="primary-color p-4 flex justify-between items-center">
    <!-- Conteúdo do cabeçalho vai aqui -->
    <h1 class="text-white text-2xl font-semibold">Seu Dashboard</h1>
    <button class="bg-blue-400" @click.stop.prevent="logout()">Sair</button>
  </header>
</template>

<script>
import cookie from "../services/cookie";
export default {
  name: "Header",
  methods: {
    logout() {
      cookie.deleteToken();
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.primary-color {
  background-color: #1b4b73;
}
</style>
