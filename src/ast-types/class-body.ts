import { ClassField } from "./class-field";

export interface ClassBody {
  type: "CLASS_BODY";
  classFields: ClassField[];
}