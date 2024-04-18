<template>
  <div class="flex justify-center text-left">
    <table class="w-[100%] text-center">
      <thead>
        <tr>
          <th class="pb-2" colspan="2">Cliente</th>
          <th>Email</th>
          <th>Data de Entrada</th>
          <th>Contato</th>
          <th>Ativo</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="customer in $pinia.state.value.customer.customers"
          class="border-y border-gray-300"
        >
          <td class="p-1">
            <img
              :src="`https://erp-api.agenciacliick.com.br/default.php/storage/${customer.customer_logo}`"
              alt="Profile Photo"
              class="w-8 h-8 rounded-full mb-2 cursor-pointer"
              @click="openUpdateProfilePhotoModal()"
            />
          </td>
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.entry_date }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.active }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TableCustomers",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style></style>
