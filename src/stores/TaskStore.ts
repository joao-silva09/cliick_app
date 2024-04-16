import { defineStore } from "pinia";
import api from "../services/api";
import { Task } from "../types/Task";
import { useApplicationStore } from "./ApplicationStore";
import { Customer } from "../types/Customer";
import { Team } from "../types/team";
import { User } from "../types/User";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as Task[],
    task: {} as Task,
    pendingTasks: [] as Task[],
    overdueTasks: [] as Task[],
    customerWithTasks: {} as Customer,
    teamWithTasks: {} as Team,
    usersToAddToTheTask: [] as User[],
    teamsToAddToTheTask: [] as Team[],
  }),
  actions: {
    storeTasks(tasks) {
      this.tasks = tasks;
    },

    storeTask(task) {
      this.task = task;
    },

    storePendingTasks(tasks) {
      this.pendingTasks = tasks;
    },

    storeOverdueTasks(tasks) {
      this.overdueTasks = tasks;
    },

    storeTaskStatus(status) {
      this.task.status = status;
    },

    storeMessage(messages) {
      this.task.messages = messages;
    },

    storeUsersToAddToTheTask(users) {
      this.usersToAddToTheTask = users;
    },

    storeTeamsToAddToTheTask(teams) {
      this.teamsToAddToTheTask = teams;
    },

    getMyTasks() {
      api
        .get(`tasks`)
        .then((response) => {
          this.storeTasks(response.data.data);
        })
        .catch((e) => alert(e));
    },

    getCompletedTasks() {
      useApplicationStore().setIsLoading(true);
      api
        .get(`tasks/completed-tasks`)
        .then((response) => {
          this.storeTasks(response.data.data);
        })
        .catch((e) => alert(e))
        .finally(() => useApplicationStore().setIsLoading(false));
    },

    getTask(taskId: Number, router: any) {
      useApplicationStore().setIsLoading(true);
      api
        .get(`tasks/${taskId}`)
        .then((response) => {
          this.storeTask(response.data.data);
        })
        .catch((e) => alert(e))
        .finally(() => {
          router.push({
            name: "task",
            params: {
              task: taskId,
            },
          });
          useApplicationStore().setIsLoading(false);
        });
    },

    storeTasksByCustomer(customer: Customer) {
      this.tasks = customer.tasks!;
      this.customerWithTasks = customer;
    },

    storeTasksByTeam(tasks, team) {
      this.tasks = tasks;
      this.teamWithTasks = team;
    },

    clearTeamsAndCustomer() {
      this.customerWithTasks = {} as Customer;
      this.teamWithTasks = {} as Team;
    },
  },
});
