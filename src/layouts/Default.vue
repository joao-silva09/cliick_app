<template>
  <div>
    <Header />
    <div class="flex">
      <Sidebar />
      <main class="flex-1 p-4">
        <!-- Conteúdo do Dashboard vai aqui -->
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";

export default {
  components: {
    Header,
    Sidebar,
  },
};
</script>

<style>
/* Estilos globais aqui, se necessário */
</style>