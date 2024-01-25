<template>
  <div class="flex gap-2">
    <ul v-for="team in $pinia.state.value.team.teams">
      <CardTeam :team="team" @click.stop.prevent="getDemandsByTeam(team.id)" />
    </ul>
  </div>
</template>

<script lang="ts">
import { useTeamStore } from "../../stores/TeamStore";
import { useDemandStore } from "../../stores/DemandStore";
import CardTeam from "../../components/Demands/CardTeam.vue";
import api from "../../services/api";

const demandStore = useDemandStore();
const teamStore = useTeamStore();
export default {
  name: "ForTeam",
  components: {
    CardTeam,
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
  methods: {
    getDemandsByTeam(teamId) {
      api
        .get(`demands/team/${teamId}`)
        .then((response) => {
          demandStore.storeDemands(
            response.data.data.map((demand) => ({
              ...demand,
              open: false,
            }))
          );
        })
        .catch(() => {
          alert("Erro ao buscar as demandas do time");
        })
        .finally(() => {
          this.$router.push({
            name: "demandsList",
            params: {
              id: teamId,
            },
          });
        });
    },
  },
};
</script>

<style></style>
