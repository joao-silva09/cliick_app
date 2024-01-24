<!-- Header.vue -->
<template>
  <header class="bg-blue-50 p-4 flex justify-between items-center">
    <!-- Conteúdo do cabeçalho vai aqui -->
    <img src="../assets/img/logo.png" class="w-16"/>
    <button class="bg-blue-400" @click.stop.prevent="logout()">Sair</button>
  </header>
</template>

<script lang="ts">
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
