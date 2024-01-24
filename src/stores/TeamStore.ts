import { defineStore } from "pinia";
import api from "../services/api";

export const useTeamStore = defineStore("team", {
  state: () => ({
    teams: [] as {
      id: string;
      name: string;
      description: string;
      users: [];
    }[]
  }),

  actions: {
    storeTeams(teams) {
      this.teams = teams;
    },
    getTeams() {
      api.get("teams").then((response) => {
        this.storeTeams(response.data.data);
      });
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
