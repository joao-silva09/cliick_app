import { Task } from "./Task";

export type Customer = {
  id?: Number;
  name?: String;
  email?: String;
  entry_date?: Date;
  customer_logo?: String;
  tasks?: Array<Task>;
};
