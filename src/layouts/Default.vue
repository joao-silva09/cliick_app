<template>
  <div>
    <Header />
    <div class="flex">
      <Sidebar />
      <div class="flex-1">
        <NavHeader />
        <main class="flex-1 p-4">
          <!-- Conteúdo do Dashboard vai aqui -->
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
import NavHeader from "./NavHeader.vue";

export default {
  components: {
    Header,
    Sidebar,
    NavHeader
  },
};
</script>

<style>
/* Estilos globais aqui, se necessário */
</style>
