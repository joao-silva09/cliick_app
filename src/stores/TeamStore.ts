import { defineStore } from "pinia";
import api from "../services/api";
import { useApplicationStore } from "./ApplicationStore";
import { Team } from "../types/team";

export const useTeamStore = defineStore("team", {
  state: () => ({
    teams: [] as Team[],
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
