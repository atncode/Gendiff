import buldAST from './diff.js';
import getFormattedTree from './formatters/index.js';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const ast = buldAST(parse(filepath1), parse(filepath2));
  return getFormattedTree(format, ast);
};

export default genDiff;
