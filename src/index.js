import fs from 'fs';
import path from 'path';
import buldAST from './diff.js';
import getFormattedTree from './formatters/index.js';
import parse from './parsers.js';

const getParsedFile = (filepath) => {
  const absolutePath = path.resolve(filepath);
  const file = fs.readFileSync(absolutePath, 'utf-8');
  const format = path.extname(filepath);
  return parse(format, file);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const ast = buldAST(getParsedFile(filepath1), getParsedFile(filepath2));
  return getFormattedTree(format, ast);
};

export default genDiff;
