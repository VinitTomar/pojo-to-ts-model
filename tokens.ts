import { createToken } from "chevrotain";


const IDENTIFIER = createToken({ name: 'Identifier', pattern: /[a-zA-Z]\w*/ });
const CLASS = createToken({ name: 'Class', pattern: /class/ });



export const Tokens = {
  IDENTIFIER,
  CLASS
};

export const allTokens = Object.keys(Tokens).map(key => Tokens[key]);