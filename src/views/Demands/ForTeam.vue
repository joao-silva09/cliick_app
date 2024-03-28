<template>
  <div>
    <h2 class="text-xl mb-8">Tarefas Por Time</h2>

    <div class="grid grid-cols-5 gap-2 h-32">
      <div v-for="team in $pinia.state.value.team.teams" class="flex">
        <CardTeam
          :team="team"
          @click.stop.prevent="getDemandsByTeam(team.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useTeamStore } from "../../stores/TeamStore";
import { useTaskStore } from "../../stores/TaskStore";
import { useCustomerStore } from "../../stores/CustomerStore";
import CardTeam from "../../components/Demands/CardTeam.vue";
import api from "../../services/api";
import { useApplicationStore } from "../../stores/ApplicationStore";

const taskStore = useTaskStore();
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
    taskStore.clearTeamsAndCustomer();
    // teams = teamStore.getAllTeams()
  },
  methods: {
    getTasksByTeam(teamId) {
      useApplicationStore().setIsLoading(true);
      api
        .get(`tasks/team/${teamId}`)
        .then((response) => {
          const tasksToAdd = response.data.data.tasks.map((task) => ({
            ...task,
            open: false,
          }));
          taskStore.storeTasksByTeam(tasksToAdd, response.data.data);
        })
        .catch((e) => {
          alert(e);
          console.log(e);
        })
        .finally(() => {
          this.$router.push({
            name: "tasksList",
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
