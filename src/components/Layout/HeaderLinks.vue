<template>
  <li class="p-2 bg-blue-200">
    <router-link :to="{ name: routeName }">{{ routeLabel }}</router-link>
  </li>
</template>

<script>
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
