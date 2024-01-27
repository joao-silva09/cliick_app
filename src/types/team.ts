import { Company } from "./Company";
import { Demand } from "./Demand";

export type Team = {
  id: Number;
  description: String;
  name: String;
  company?: Company;
  demands?: Array<Demand>;
};
