import fs from 'fs';
import path from 'path';
import buldAST from './diff.js';
import format from './formatters/index.js';
import parse from './parsers.js';

const readFile = (filepath) => {
  const absolutePath = path.resolve(filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(filepath).slice(1);
  return parse(extension, data);
};

const genDiff = (filepath1, filepath2, outputformat = 'stylish') => {
  const ast = buldAST(readFile(filepath1), readFile(filepath2));
  return format(outputformat, ast);
};

export default genDiff;
