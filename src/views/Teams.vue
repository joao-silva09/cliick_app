<template>
  <div style="height: 300px">
    <div class="flex justify-between mb-4 items-center">
      <h2 class="text-xl mb-8">Times</h2>
      <button
        @click="openModal()"
        class="rounded px-3 py-2 bg-blue-600 text-white hover:bg-blue-800 hover:transition-all"
      >
        Adicionar Time
      </button>
    </div>

    <ul class="flex gap-8">
      <li
        v-for="(team, index) in $pinia.state.value.team.teams"
        :key="index"
        class="bg-gray-200 my-2 px-4 py-2"
      >
        <h3 class="text-lg">
          {{ team.name }}
        </h3>
        - {{ team.email }} - {{ team.entry_date }}
      </li>
    </ul>

    <Modal ref="modal" />
  </div>
</template>

<script lang="ts">
import api from "../services/api";
import { useTeamStore } from "../stores/TeamStore";
import Modal from "../components/Teams/AddTeamModal.vue";
import { useApplicationStore } from "../stores/ApplicationStore";

const teamStore = useTeamStore();
export default {
  name: "Teams",

  components: {
    Modal,
  },

  data() {
    return {};
  },

  created() {
    this.getTeams();
  },

  methods: {
    getTeams() {
      useApplicationStore().setIsLoading(true);
      api
        .get("teams")
        .then((response) => {
          teamStore.storeTeams(response.data.data);
        })
        .catch((e) => alert(e))
        .finally(() => useApplicationStore().setIsLoading(false));
    },

    openModal() {
      this.$refs.modal.openModal();
    },
  },
};
</script>

<style></style>
