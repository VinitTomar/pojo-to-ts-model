/**
 * Scope of this project to create a parser for POJO (plain old java object)
 * so that an equivalent typescript model can be generated.
 */

import { PojoLexer } from './lexer';
import { fileReader } from './async-file-reader';

(async () => {
  const fileText: string = (await fileReader('sample.java')).toString();
  const lexerResult = PojoLexer.tokenize(fileText);
  console.log({ lexerResult });
})();