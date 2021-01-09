/**
 * Scope of this project to create a parser for POJO (plain old java object)
 * so that an equivalent typescript model can be generated.
 */

import { PojoLexer } from './lexer';
import { fileReader } from './async-file-reader';
import { pojoParseObj } from './parser';
import { PojoVisitor } from './visitor';
import { pojoClassConverter } from './code-generator';
import { fileWriter } from './async-file-writer';

(async () => {
  const parser = pojoParseObj

  const fileText: string = (await fileReader('sample.java')).toString();

  const lexerResult = PojoLexer.tokenize(fileText);

  console.log({ lexerResult });

  parser.input = lexerResult.tokens;

  const cst = parser.pojoClass();

  if (parser.errors.length > 0) {
    const msg = parser.errors.map(err => err.message);
    throw new Error(msg.join('\n'));
  }

  const cstToAstVisitorObj = new PojoVisitor();

  const ast = cstToAstVisitorObj.visit(cst);

  const tsClassResult = pojoClassConverter(ast);

  fileWriter(tsClassResult[0] + ".ts",tsClassResult[1]);

})();