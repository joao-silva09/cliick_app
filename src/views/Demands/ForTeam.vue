<template>
  <div>
    <h2 class="text-xl mb-8">Demandas Por Time</h2>

    <div class="flex gap-2">
      <div v-for="team in $pinia.state.value.team.teams" class="flex">
        <CardTeam
          :team="team"
          @click.stop.prevent="getDemandsByTeam(team.id)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useTeamStore } from "../../stores/TeamStore";
import { useDemandStore } from "../../stores/DemandStore";
import { useCustomerStore } from "../../stores/CustomerStore";
import CardTeam from "../../components/Demands/CardTeam.vue";
import api from "../../services/api";
import { useApplicationStore } from "../../stores/ApplicationStore";

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
    useCustomerStore().getCustomers();
    // teams = teamStore.getAllTeams()
  },
  methods: {
    getDemandsByTeam(teamId) {
      useApplicationStore().setIsLoading(true);
      api
        .get(`demands/team/${teamId}`)
        .then((response) => {
          demandStore.storeDemands(
            response.data.data.map((demand) => ({
              ...demand,
              open: false,
            }))
            // demandStore.storeTasks(response.data.data[].)
          );
        })
        .catch((e) => {
          alert(e);
          console.log(e);
        })
        .finally(() => {
          this.$router.push({
            name: "demandsList",
            params: {
              id: teamId,
            },
          });
          useApplicationStore().setIsLoading(false);
        });
    },
  },
};
</script>

<style></style>
