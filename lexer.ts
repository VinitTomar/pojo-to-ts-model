import { Lexer } from "chevrotain";
import { allTokens } from "./tokens";


const PojoLexer = new Lexer(allTokens);

export {
  PojoLexer
}