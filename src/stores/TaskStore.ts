import { defineStore } from "pinia";
import api from "../services/api";
import { Task } from "../types/Task";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as Task[],
    task: {} as Task,
  }),
  actions: {
    storeTasks(tasks) {
      this.tasks = tasks;
    },

    storeTask(task) {
      this.task = task;
    },

    storeMessage(messages) {
      this.task.messages = messages;
    },

    getMyTasks() {
      api.get(`tasks`).then((response) => {
        this.storeTasks(response.data.data);
      });
    },

    getTask(taskId: Number, router: any) {
      api
        .get(`tasks/${taskId}`)
        .then((response) => {
          this.storeTask(response.data.data);
        })
        .catch((e) => alert(e))
        .finally(() =>
          router.push({
            name: "task",
            params: {
              task: taskId,
            },
          })
        );
    },
  },
});
