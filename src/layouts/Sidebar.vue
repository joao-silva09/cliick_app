<!-- Sidebar.vue -->
<template>
  <aside class="bg-gray-800 text-white p-4 h-screen">
    <!-- Conteúdo do menu lateral vai aqui -->
    <ul>
      <li><router-link to="/">Página Inicial</router-link></li>
      <li><router-link :to="{ name: 'customers' }">Clientes</router-link></li>
      <!-- Adicione mais itens de menu conforme necessário -->
    </ul>
  </aside>
</template>

<script>
export default {};
</script>

<style scoped>
/* Estilos específicos para o menu lateral aqui */
</style>
