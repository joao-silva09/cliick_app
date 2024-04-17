import { MessageTypeEnum } from "./Enums";
import { User } from "./User";

export type Message = {
  id?: string;
  message?: string;
  username?: string;
  message_type?: MessageTypeEnum;
  created_at?: Date;
  sent_by?: User;
};
