import { Company } from "./Company";

export type Expense = {
  id?: Number;
  title?: String;
  description?: String;
  value?: number;
  paid_at?: Date;
  company?: Company;
  totalExpense?: number;
};
