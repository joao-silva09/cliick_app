<template>
  <div>
    <div class="flex justify-between mb-4 items-center">
      <h2 class="text-xl mb-8">Serviços</h2>
      <button
        @click="openModal()"
        class="rounded px-3 py-2 bg-blue-600 text-white hover:bg-blue-800 hover:transition-all"
      >
        Adicionar Serviço
      </button>
    </div>
    <div
      v-if="$pinia.state.value.service.services.length !== 0"
      class="flex justify-between mb-4 items-center"
    >
      <table class="w-[100%]">
        <thead>
          <tr>
            <th class="pb-2">Nome do Serviço</th>
            <th>Descrição</th>
            <th>Valor Base</th>
            <th>Ativo</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="service in $pinia.state.value.service.services"
            class="border-y border-gray-300 text-center"
          >
            <td class="p-1">{{ service.name }}</td>
            <td>{{ service.description }}</td>
            <td>
              {{
                service.base_value.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })
              }}
            </td>
            <td v-if="service.active">
              <CheckIcon class="w-6 text-green-600" />
            </td>
            <td v-else><XMarkIcon class="w-6 text-red-600" /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3 v-else class="text-center">Nenhum serviço cadastrado</h3>

    <AddServiceModal ref="addServiceModal" />
  </div>
</template>

<script>
import api from "../../services/api";
import { useServiceStore } from "../../stores/ServiceStore";
import { useApplicationStore } from "../../stores/ApplicationStore";
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import AddServiceModal from "../../components/Services/AddServiceModal.vue";

const serviceStore = useServiceStore();
export default {
  name: "Services",
  data() {
    return {};
  },
  components: {
    AddServiceModal,
    CheckIcon,
    XMarkIcon,
  },
  created() {
    this.getServices();
  },
  methods: {
    getServices() {
      useApplicationStore().setIsLoading(true);
      api
        .get("services")
        .then((response) => {
          serviceStore.storeServices(response.data.data);
        })
        .catch((e) => alert(e))
        .finally(() => useApplicationStore().setIsLoading(false));
    },
    openModal() {
      this.$refs.addServiceModal.openModal();
    },
  },
};
</script>

<style></style>
