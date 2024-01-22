import { defineStore } from "pinia";

export const useTeamStore = defineStore("team", {
  state: () => ({
    teams: [] as {
      id: string;
      name: string;
      description: string;
      users: []
    }[],
  }),
  actions: {
    storeTeams(teams) {
      this.teams = teams
    }
  },
});
