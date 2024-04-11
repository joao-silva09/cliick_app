import { Customer } from "./Customer";

export type Contract = {
  id?: Number;
  start_date?: Date;
  end_date?: Date;
  status?: number;
  customer?: Customer;
};
