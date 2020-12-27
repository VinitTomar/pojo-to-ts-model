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
      classMembers: ctx.classMembers.map(mem => this.visit(mem as CstNode | CstNode[]))
    };
  }

  classMembers(ctx: CstChildrenDictionary) {
    return {
      type: 'CLASS_MEMBERS',
      accessibility: ctx.memberAccessibility ? this.visit(ctx.memberAccessibility as CstNode | CstNode[]) : null,
      memberType: this.visit(ctx.memberType as CstNode | CstNode[]),
      memberName: (ctx.Identifier[0] as IToken).image
    };
  }

  memberType(ctx: CstChildrenDictionary) {
    return {
      type: 'MEMBER_TYPE',
      dataType: ctx[Object.keys(ctx)[0]][0]['image']
    };
  }

  memberAccessibility(ctx: CstChildrenDictionary) {
    return {
      type: 'MEMBER_ACCESSIBILITY',
      dataType: ctx[Object.keys(ctx)[0]][0]['image']
    };
  }

}