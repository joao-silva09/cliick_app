import { defineStore } from "pinia";
import { Message } from "../types/Message";

export const useMessageStore = defineStore("message", {
  state: () => ({
    messages: [] as Message[],
    totalExpense: 0
  }),
  actions: {
    storeMessages(messages) {
      this.messages = messages;
    },
  },
});
