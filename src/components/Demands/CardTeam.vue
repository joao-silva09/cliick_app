<template>
  <div
    class="border border-slate-950 rounded-sm flex w-full hover:bg-slate-600 hover:translate-y-1 hover:transition-all cursor-pointer p-2"
  >
    <!-- {{ this.team }} -->
    {{ this.team.name }}
  </div>
</template>

<script lang="ts">
export default {
  name: "CardTeam",
  props: {
    team: Object,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
