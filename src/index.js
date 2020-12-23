import buldAST from './nestedDiff.js';
import getFormattedTree from './formatters/index.js';

const genDiff = (obj1, obj2, format) => {
  const ast = buldAST(obj1, obj2);
  return getFormattedTree(format, ast);
};

export default genDiff;
