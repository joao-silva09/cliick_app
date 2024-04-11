import { Message } from "./Message";
import { User } from "./User";

export type Task = {
  id?: Number;
  title?: String;
  description?: String;
  status?: String;
  deadline?: Date;
  messages?: Array<Message>;
  users?: Array<User>;
};
