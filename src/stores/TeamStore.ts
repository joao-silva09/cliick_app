import { defineStore } from "pinia";
import api from "../services/api";
import { useApplicationStore } from "./ApplicationStore";
import { Team } from "../types/team";

export const useTeamStore = defineStore("team", {
  state: () => ({
    teams: [] as {
      id: string;
      name: string;
      description: string;
      users: [];
    }[],
    currentTeamToAddDemand: {} as Team,
  }),

  actions: {
    storeTeams(teams) {
      this.teams = teams;
    },
    getTeams() {
      useApplicationStore().setIsLoading(true);
      api
        .get("teams")
        .then((response) => {
          this.storeTeams(response.data.data);
        })
        .catch((e) => alert(e))
        .finally(() => useApplicationStore().setIsLoading(false));
    },

    setCurrentTeamToAddDemand(team) {
      this.currentTeamToAddDemand = team;
    },
  },

  getters: {
    getAllTeams(): Array<{
      id: string;
      name: string;
      description: string;
      users: [];
    }> {
      return this.teams;
    },
  },
});

export type TeamStore = ReturnType<typeof useTeamStore>;
