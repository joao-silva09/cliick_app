import { defineStore } from "pinia";
import api from "../services/api";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as {
      id: string;
      name: string;
      email: string;
      entry_date: Date;
    }[],
    task: {} as {
      id: string;
      name: string;
      email: string;
      entry_date: Date;
    },
  }),
  actions: {
    storeTasks(tasks) {
      this.tasks = tasks
    },
    storeTask(task) {
      this.task = task
    },
    getTask(taskId: Number) {
      api.get(`tasks/${taskId}`).then((response) => {
        this.storeTask(response.data.data);
      })
    }
  },
});
