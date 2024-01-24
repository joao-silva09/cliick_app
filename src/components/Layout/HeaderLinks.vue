<template>
  <router-link :to="{ name: routeName }">
    <li class="p-2 bg-blue-200">
      {{ routeLabel }}
    </li>
  </router-link>
</template>

<script lang="ts">
export default {
  name: "HeaderLinks",
  props: {
    routeName: String,
    routeLabel: String,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
