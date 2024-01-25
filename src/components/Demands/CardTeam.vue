<template>
  <router-link
    :to="{
      name: 'demandsForOneTeam',
      params: {
        team: this.team.id,
      },
    }"
  >
    <div
      class="border border-slate-950 rounded-sm flex w-40 hover:bg-slate-600 hover:translate-y-1 hover:transition-all"
    >
      <!-- {{ this.team }} -->
      {{ this.team.name }}
    </div>
  </router-link>
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
