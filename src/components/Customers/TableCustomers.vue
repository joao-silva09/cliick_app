<template>
  <div class="flex justify-center text-left">
    <table class="w-[100%]">
      <thead>
        <tr>
          <th class="pb-2">Nome</th>
          <th>Email</th>
          <th>Data de Entrada</th>
          <th>Contato</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="customer in $pinia.state.value.customer.customers"
          class="border-y border-gray-300"
        >
          <td>
            <img
              :src="`https://erp-api.agenciacliick.com.br/default.php/storage/${customer.customer_logo}`"
              alt="Profile Photo"
              class="w-32 h-32 rounded-full mb-2 cursor-pointer"
              @click="openUpdateProfilePhotoModal()"
            />
          </td>
          <td class="p-1">{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.entry_date }}</td>
          <td>4598944658</td>
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
