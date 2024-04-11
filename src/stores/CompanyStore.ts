import { defineStore } from "pinia";
import { Company } from "../types/Company";

export const useCompanyStore = defineStore("company", {
  state: () => ({
    company: {} as Company,
  }),
  actions: {
    storeCompany(company) {
      this.company = company;
    },

    // getCustomers() {
    //   useApplicationStore().setIsLoading(true);
    //   api
    //     .get("customers")
    //     .then((response) => {
    //       // this.storeCustomers(response.data.data);
    //     })
    //     .catch((e) => alert(e))
    //     .finally(() => useApplicationStore().setIsLoading(false));
    // },
  },
});
