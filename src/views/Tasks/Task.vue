<template>
  <div class="grid grid-cols-2 gap-2">
    <div class="w-full flex flex-col gap-8">
      <div class="w-full border border-red-700 p-3 rounded-sm">
        <h2 class="text-xl">
          {{ $pinia.state.value.task.task.title }}
        </h2>
        <h4>
          {{ $pinia.state.value.task.task.description }}
        </h4>
        <h5>
          {{ $pinia.state.value.task.task.status }}
        </h5>
        <p>
          {{ $pinia.state.value.task.task.demand.customer.name }}
        </p>

        <p>
          Prazo:
          {{
            new Date($pinia.state.value.task.task.deadline).toLocaleDateString()
          }}
        </p>
      </div>

      <div class="w-full border border-red-700 p-3 rounded-sm">
        <h2>Atribuído a:</h2>
        <div v-for="user in $pinia.state.value.task.task.users" :key="user.id">
          {{ user.first_name + " " + user.last_name }}
        </div>
      </div>
    </div>

    <!-- h-screen rounded-sm p-4 flex flex-1 flex-col justify-end overflow-y-auto -->
    <div>
      <div
        class="px-3 messages h-[75vh] overflow-y-auto"
        ref="messageContainer"
      >
        <div
          v-for="message in $pinia.state.value.task.task.messages"
          :class="message.username === userName ? 'flex justify-end' : ''"
          :key="message.id"
        >
          <Message
            :username="message.username"
            :content="message.message"
            :date="new Date(message.created_at).toLocaleString()"
            :sent-by-me="message.username === userName"
          />
        </div>
      </div>
      <input
        v-model="contentMessage"
        type="text"
        placeholder="Digite sua mensagem..."
        class="border mt-1 border-gray-400 shadow-xl w-full p-2 rounded focus:outline-none"
        @keyup.enter="addMessage()"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useTaskStore } from "../../stores/TaskStore";
import { useUserStore } from "../../stores/UserStore";
import Message from "../../components/Tasks/Message.vue";
import api from "../../services/api";
import { Message as MessageType } from "../../types/Message";

const userStore = useUserStore();
const taskStore = useTaskStore();
export default {
  name: "task",
  components: {
    Message,
  },
  data() {
    return {
      contentMessage: "",
      userName: userStore.user.first_name + " " + userStore.user.last_name,
    };
  },
  created() {
    this.messagesList = taskStore.task.messages;
  },
  mounted() {
    this.scrollToBottom();
  },
  methods: {
    addMessage() {
      const payload = {
        message: this.contentMessage,
        task_id: taskStore.task.id,
      };
      api
        .post("messages", payload)
        .then((response) => {
          const currentMessages: MessageType[] = taskStore.task.messages;
          currentMessages?.push(response.data.data);
          taskStore.storeMessage(currentMessages);
          // this.messagesList.push(response.data.data);
        })
        .catch((e) => alert(e))
        .finally(() => this.scrollToBottom());

      this.contentMessage = "";
    },

    scrollToBottom() {
      // Acesse o elemento com a ref e role para o final
      const container = this.$refs.messageContainer;
      container.scrollTop = container.scrollHeight;
    },
  },
};
</script>

<style>
.messages::-webkit-scrollbar {
  width: 10px;
}
.messages::-webkit-scrollbar-track {
  background-attachment: #ddd;
}
.messages::-webkit-scrollbar-thumb {
  background-color: #ddd;
}
</style>
