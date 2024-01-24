<template>
  <div>
    Por Cliente
    <ul v-for="team in $pinia.state.value.team.teams">
      <router-link :to="team.name">
        {{ team.name }}
      </router-link>

    </ul>
  </div>
</template>

<script lang="ts">
import { useTeamStore } from "../../stores/TeamStore";

const teamStore = useTeamStore();
export default {
  name: "ForTeam",
  setup() {
    return {};
  },

  data() {
    return {
      team: "afsdaf",
      teams: [],
    };
  },
  beforeCreate() {
    teamStore.getTeams();
    // teams = teamStore.getAllTeams()
  },
  mounted() {
    teamStore.getTeams();
    // teams = teamStore.getAllTeams()
  },
  methods: {},
};
</script>

<style></style>
