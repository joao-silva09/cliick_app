import { Company } from "./Company";

export type Expense = {
  id?: Number;
  title?: String;
  description?: String;
  value?: Number;
  paid_at?: Date;
  company?: Company;
};
