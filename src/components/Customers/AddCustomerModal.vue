<!-- Modal.vue -->
<template>
  <div v-if="isOpen" class="fixed inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Máscara de fundo -->
      <div class="fixed inset-0 transition-opacity" @click="closeModal">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- Conteúdo da modal -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
      <!-- Alinha ao centro no sm -->
      &#8203;
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <!-- Conteúdo interno da modal -->
        <div class="bg-white p-4">
          <h2 class="text-2xl font-semibold mb-4">Adicionar novo cliente</h2>
          <label for="name">Nome</label>
          <input
            v-model="customer.name"
            type="text"
            id="name"
            class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <label for="email">Email</label>
          <input
            v-model="customer.email"
            type="email"
            id="email"
            class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <div class="flex justify-between">
            <label for="phone" class="w-[48%]"
              >Telefone
              <input
                v-model="customer.phone"
                type="number"
                id="phone"
                class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </label>

            <label for="entry_date" class="w-[48%]"
              >Data de Entrada
              <input
                v-model="customer.entryDate"
                type="date"
                id="entry_date"
                class="px-2 block w-full rounded-md border-0 py-1.5 mb-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </label>
          </div>

          <label for="customer_logo">Logo do cliente</label>
          <input
            type="file"
            id="customer_logo"
            @change="logoChanged"
            class="w-full"
          />
        </div>

        <!-- Botão para fechar a modal -->
        <div class="p-4 flex justify-end gap-2">
          <button
            @click="closeModal"
            class="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Fechar
          </button>
          <button
            @click="createCustomer"
            class="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import { useApplicationStore } from "../../stores/ApplicationStore";
import { useCustomerStore } from "../../stores/CustomerStore";

const customerStore = useCustomerStore();
export default {
  data() {
    return {
      isOpen: false,
      customer: {
        name: "",
        email: "",
        phone: "",
        entryDate: "",
        active: 1,
        customer_logo: null,
      },
    };
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },

    closeModal() {
      this.isOpen = false;
    },

    logoChanged(event) {
      this.customer.customer_logo = event.target.files[0];
    },

    // createCustomer() {
    //   useApplicationStore().setIsLoading(true);
    //   const payload = {
    //     name: this.customer.name,
    //     email: this.customer.email,
    //     phone: this.customer.phone.toString(),
    //     entry_date: this.customer.entryDate,
    //     company_id: 1,
    //   };

    //   api
    //     .post("customers", payload)
    //     .then((response) => {
    //       const currentCustomers = customerStore.customers;
    //       currentCustomers.unshift(response.data.data);
    //       customerStore.storeCustomers(currentCustomers);
    //     })
    //     .catch((e) => alert(e))
    //     .finally(() => useApplicationStore().setIsLoading(false));

    //   this.closeModal();
    // },

    async createCustomer() {
      useApplicationStore().setIsLoading(true);
      const formData = new FormData();

      // Adiciona os dados existentes ao FormData
      formData.append("name", this.customer.name);
      formData.append("email", this.customer.email);
      formData.append("phone", this.customer.phone.toString());
      formData.append("entry_date", this.customer.entryDate);
      formData.append("active", this.customer.active);
      formData.append("company_id", 1);

      // Verifica se um arquivo de logo foi selecionado e adiciona ao FormData
      if (this.customer.customer_logo) {
        formData.append("customer_logo", this.customer.customer_logo);
      }

      try {
        // Envia os dados do cliente com o arquivo para o servidor
        const response = await api.post("customers", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const currentCustomers = customerStore.customers;
        currentCustomers.unshift(response.data.data);
        customerStore.storeCustomers(currentCustomers);
        alert("Cliente cadastrado com sucesso!");
      } catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
        alert("Erro ao cadastrar cliente.");
      } finally {
        useApplicationStore().setIsLoading(false);
      }
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* Estilos específicos da modal aqui, se necessário */
</style>
