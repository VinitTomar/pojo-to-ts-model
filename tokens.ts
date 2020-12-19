import { createToken, Lexer } from "chevrotain";

const WHITESPACE = createToken({ name: 'Whitespace', pattern: /\s+/, group: Lexer.SKIPPED });
const IDENTIFIER = createToken({ name: 'Identifier', pattern: /[a-zA-Z]\w*/ });
const CLASS = createToken({ name: 'Class', pattern: /class/, longer_alt: IDENTIFIER });
const PUBLIC_ACCESS_SPECIFIER = createToken({ name: "PublicAccessSpecifier", pattern: /public/, longer_alt: IDENTIFIER });
const PRIVATE_ACCESS_SPECIFIER = createToken({ name: "PrivateAccessSpecifier", pattern: /purivate/, longer_alt: IDENTIFIER });
const PROTECTED_ACCESS_SPECIFIER = createToken({ name: "ProtectedAccessSpecifier", pattern: /protected/, longer_alt: IDENTIFIER });
const LEFT_CURLY_BRACE = createToken({ name: "LeftCurlyBrace", pattern: /{/ });
const RIGHT_CURLY_BRACE = createToken({ name: "RightCurlyBrace", pattern: /}/ });
const SEMICOLON = createToken({ name: 'Semicolon', pattern: /;/ });

/**
 * Primitive data type tokens
 */

const INT = createToken({ name: 'Int', pattern: /int/, longer_alt: IDENTIFIER });
const CHAR = createToken({ name: 'Char', pattern: /char/, longer_alt: IDENTIFIER });
const LONG = createToken({ name: 'Long', pattern: /long/, longer_alt: IDENTIFIER });
const FLOAT = createToken({ name: 'Float', pattern: /float/, longer_alt: IDENTIFIER });
const DOUBLE = createToken({ name: "Double", pattern: /double/, longer_alt: IDENTIFIER });
const BOOLEAN = createToken({ name: 'Boolean', pattern: /boolean/, longer_alt: IDENTIFIER });


export const Tokens = {
  WHITESPACE,
  CLASS,
  PUBLIC_ACCESS_SPECIFIER,
  PRIVATE_ACCESS_SPECIFIER,
  PROTECTED_ACCESS_SPECIFIER,
  LEFT_CURLY_BRACE,
  RIGHT_CURLY_BRACE,
  SEMICOLON,
  INT,
  CHAR,
  LONG,
  FLOAT,
  DOUBLE,
  BOOLEAN,
  IDENTIFIER,
};

export const allTokens = Object.keys(Tokens).map(key => Tokens[key]);