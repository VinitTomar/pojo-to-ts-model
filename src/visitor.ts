import { CstChildrenDictionary, CstNode, IToken } from "chevrotain";
import { pojoParseObj, PojoParser } from "./parser";

const BasePojoVisitor = pojoParseObj.getBaseCstVisitorConstructor();

export class PojoVisitor extends BasePojoVisitor {

  constructor() {
    super();
    this.validateVisitor();
  }

  pojoClass(ctx: CstChildrenDictionary) {
    return {
      type: 'POJO_CLASS',
      hasPublicAccessSpecifier: (ctx.PublicAccessSpecifier[0] as IToken).image ? true : false,
      className: (ctx.Identifier[0] as IToken).image,
      classBody: this.visit(ctx.classBody as CstNode | CstNode[])
    };
  }

  classBody(ctx: CstChildrenDictionary) {
    return {
      type: "CLASS_BODY",
      classFields: ctx.classField.map(mem => this.visit(mem as CstNode | CstNode[]))
    };
  }

  classField(ctx: CstChildrenDictionary) {
    return {
      type: 'CLASS_FIELD',
      accessibility: ctx.fieldAccessibility ? this.visit(ctx.fieldAccessibility as CstNode | CstNode[]) : null,
      fieldType: this.visit(ctx.fieldType as CstNode | CstNode[]),
      fieldName: (ctx.Identifier[0] as IToken).image
    };
  }

  fieldType(ctx: CstChildrenDictionary) {
    return {
      type: 'FIELD_TYPE',
      dataType: ctx[Object.keys(ctx)[0]][0]['image']
    };
  }

  fieldAccessibility(ctx: CstChildrenDictionary) {
    return {
      type: 'FIELD_ACCESSIBILITY',
      accessibilityType: ctx[Object.keys(ctx)[0]][0]['image']
    };
  }

}