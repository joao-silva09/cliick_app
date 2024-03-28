import { Company } from "./Company";
import { Task } from "./Task";
import { User } from "./User";

export type Team = {
  id?: Number;
  description?: String;
  name?: String;
  company?: Company;
  tasks?: Array<Task>;
  users?: Array<User>;
};
