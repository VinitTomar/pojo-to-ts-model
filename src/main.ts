/**
 * Scope of this project to create a parser for POJO (plain old java object)
 * so that an equivalent typescript model can be generated.
 */

import { PojoLexer } from './lexer';
import { fileReader } from './async-file-reader';
import { PojoParser } from './parser';

(async () => {
  const parser = new PojoParser();

  const fileText: string = (await fileReader('sample.java')).toString();

  const lexerResult = PojoLexer.tokenize(fileText);

  console.log({ lexerResult });

  parser.input = lexerResult.tokens;

  const cst = parser.pojoClass();

  if (parser.errors.length > 0) {
    const msg = parser.errors.map(err => err.message);
    throw new Error(msg.join('\n'));
  }

  console.log({ cst });

})();