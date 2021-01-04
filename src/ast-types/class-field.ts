import { FieldAccessibility } from "./field-accessibility";
import { FieldType } from "./field-type";

export interface ClassField {
  type: "CLASS_FIELD";
  fieldName: string;
  accessibility: FieldAccessibility;
  fieldType: FieldType;
}