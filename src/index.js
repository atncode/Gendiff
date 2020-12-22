import buldAST from './nestedDiff.js';
import formatter from './stylish.js';
import getDiffFlat from './flatDiff.js';

const genDiff = (obj1, obj2, format) => {
  let run;
  if (format === 'nested') {
    const ast = buldAST(obj1, obj2);
    run = formatter(ast);
  }
  if (format === 'flat') {
    run = getDiffFlat(obj1, obj2);
  }
  return run;
};

export default genDiff;
