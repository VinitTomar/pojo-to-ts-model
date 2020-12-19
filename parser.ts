import { CstParser } from "chevrotain";
import { allTokens, Tokens } from "./tokens";


export class PojoParser extends CstParser {

  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  public pojoClass = this.RULE('pojoClass', () => {
    this.OPTION(() => {
      this.CONSUME(Tokens.PUBLIC_ACCESS_SPECIFIER);
    });

    this.CONSUME(Tokens.CLASS);
    this.CONSUME(Tokens.IDENTIFIER);
    this.CONSUME(Tokens.LEFT_CURLY_BRACE);
    this.SUBRULE(this.classBody);
    this.CONSUME(Tokens.RIGHT_CURLY_BRACE);

  });

  private classBody = this.RULE('classBody', () => {
    this.AT_LEAST_ONE({
      DEF: () => {
        this.SUBRULE(this.classMembers);
      }
    });
  });

  private classMembers = this.RULE('classMembers', () => {
    this.OPTION(() => {
      this.SUBRULE(this.memberAccessibility);
    });

    this.SUBRULE(this.memberType);
    this.CONSUME(Tokens.IDENTIFIER);
    this.CONSUME(Tokens.SEMICOLON);
  });

  private memberType = this.RULE('memberType', () => {
    this.OR([
      { ALT: () => this.CONSUME(Tokens.INT) },
      { ALT: () => this.CONSUME(Tokens.DOUBLE) },
      { ALT: () => this.CONSUME(Tokens.CHAR) },
      { ALT: () => this.CONSUME(Tokens.FLOAT) },
      { ALT: () => this.CONSUME(Tokens.LONG) },
      { ALT: () => this.CONSUME(Tokens.BOOLEAN) },
      { ALT: () => this.CONSUME(Tokens.STRING) },
    ]);
  });

  private memberAccessibility = this.RULE('memberAccessibility', () => {
    this.OR([
      { ALT: () => this.CONSUME(Tokens.PRIVATE_ACCESS_SPECIFIER) },
      { ALT: () => this.CONSUME(Tokens.PUBLIC_ACCESS_SPECIFIER) },
      { ALT: () => this.CONSUME(Tokens.PROTECTED_ACCESS_SPECIFIER) },
    ]);
  });

}