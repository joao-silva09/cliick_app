import { Customer } from "./Customer";
import { Service } from "./Service";

export type Contract = {
  id?: Number;
  start_date?: Date;
  end_date?: Date;
  status?: number;
  customer?: Customer;
  services?: Service[];
};
