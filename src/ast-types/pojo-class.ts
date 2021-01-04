import { ClassBody } from "./class-body";

export interface PojoClass {
  type: "POJO_CLASS";
  hasPublicAccessSpecifier: boolean;
  className: string;
  classBody: ClassBody;
}