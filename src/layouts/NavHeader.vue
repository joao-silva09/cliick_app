<template>
  <nav class="w-full p-2">
    <ul v-if="$route.matched[1].path === '/customers'" class="flex gap-2">
      <HeaderLinks :routeName="'customers'" routeLabel="Todos" />
    </ul>
    <ul v-if="$route.matched[1].path === '/demands'" class="flex gap-2">
      <HeaderLinks :routeName="'demandsGeral'" routeLabel="Geral" />
      <HeaderLinks :routeName="'demandsForTeam'" routeLabel="Por Time" />
      <HeaderLinks :routeName="'demandsForCustomer'" routeLabel="Por Cliente" />
    </ul>
    <ul v-if="$route.matched[1].path === '/financial'" class="flex gap-2">
      <HeaderLinks :routeName="'demandsForTeam'" routeLabel="Geral" />
      <HeaderLinks :routeName="'demandsForTeam'" routeLabel="Despesas" />
      <HeaderLinks :routeName="'demandsForTeam'" routeLabel="Dívidas" />
    </ul>
  </nav>
</template>

<script lang="ts">
import HeaderLinks from "../components/Layout/HeaderLinks.vue";
import { useUserStore } from "../stores/UserStore";
export default {
  name: "NavHeader",
  components: {
    HeaderLinks,
  },

  data() {
    return {
      //   routes: {
      //     demands: [
      //       {
      //         name: "perTeam",
      //         route: "/per-team",
      //       },
      //       {
      //         name: "perCustomer",
      //         route: "/per-customer",
      //       },
      //     ],
      //   },
    };
  },

  mounted() {
    console.log(this.$route);
  },
  methods: {},
  watch: {
    $route() {
      useUserStore().storeCurrentRouteName(this.$route?.matched[2]?.name);
    },
  },
};
</script>

<style></style>
