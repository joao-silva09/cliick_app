<template>
  <div class="flex gap-2">
    <ul v-for="team in $pinia.state.value.team.teams">
      <CardTeam :team="team" />
    </ul>
  </div>
</template>

<script lang="ts">
import { useTeamStore } from "../../stores/TeamStore";
import CardTeam from "../../components/Demands/CardTeam.vue";

const teamStore = useTeamStore();
export default {
  name: "ForTeam",
  components: {
    CardTeam
  },

  data() {
    return {
      teams: [],
    };
  },
  mounted() {
    teamStore.getTeams();
    // teams = teamStore.getAllTeams()
  },
  methods: {},
};
</script>

<style></style>
