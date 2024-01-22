<!-- Sidebar.vue -->
<template>
  <aside class="bg-gray-800 text-white p-4 h-screen">
    <!-- Conteúdo do menu lateral vai aqui -->
    Olá, {{ userName }}
    <br><br>
    <ul>
      <li><router-link :to="{ name: 'home' }">Página Inicial</router-link></li>
      <li><router-link :to="{ name: 'customers' }">Clientes</router-link></li>
      <li><router-link :to="{ name: 'demands' }">Demandas</router-link></li>
      <!-- Adicione mais itens de menu conforme necessário -->
    </ul>
  </aside>
</template>

<script>
import { useUserStore } from "../stores/UserStore";

const userStore = useUserStore();

export default {
  data() {
    return {
      userName: userStore.user.first_name,
    };
  },
};
</script>

<style scoped>
/* Estilos específicos para o menu lateral aqui */
</style>
