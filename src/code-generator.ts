import { ClassBody } from "./ast-types/class-body";
import { ClassField } from "./ast-types/class-field";
import { FieldAccessibility } from "./ast-types/field-accessibility";
import { FieldType } from "./ast-types/field-type";
import { PojoClass } from "./ast-types/pojo-class";

const fieldAccessibilityConverter = (item: FieldAccessibility): string => {
  if (item !== null && item.type !== 'FIELD_ACCESSIBILITY') {
    throw new Error("Item type is not FIELD_ACCESSIBILITY");
  }

  if (item !== null) {
    return item.accessibilityType + ' ';
  }

  return '';
}

const fieldTypeConverter = (item: FieldType): string => {

  if (item.type !== 'FIELD_TYPE') {
    throw new Error("Item type is not FIELD_TYPE");
  }

  switch (item.dataType) {
    case "int":
    case "long":
    case "float":
    case "double":
      return 'number';

    case "char":
    case "String":
      return 'string';
  }

  return 'boolean';
}


const fieldConverter = (item: ClassField): string => {
  if (item.type !== 'CLASS_FIELD') {
    throw new Error("Item type is not CLASS_FIELD");
  }

  return `${fieldAccessibilityConverter(item.accessibility)}${item.fieldName}: ${fieldTypeConverter(item.fieldType)}`;

};

const classBodyConverter = (item: ClassBody): string => {
  if (item.type !== 'CLASS_BODY') {
    throw new Error("Item type is not CLASS_BODY");
  }

  return item.classFields.reduce((prev, curr) => {
    return `${prev}\t${fieldConverter(curr)}\n`;
  }, '');
}

const pojoClassConverter = (item: PojoClass): [string, string] => {
  if (item.type !== 'POJO_CLASS') {
    throw new Error("Item type is not POJO_CLASS");
  }

  const publicAccessSpecifierString = item.hasPublicAccessSpecifier ? 'export' : '';

  const fileContent = `${publicAccessSpecifierString} class ${item.className} {\n${classBodyConverter(item.classBody)}}`;

  return [item.className, fileContent];
}

export { pojoClassConverter };