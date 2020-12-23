import stylish from './stylish.js';
import plain from './plain.js';

const getFormattedTree = (format, ast) => {
  switch (format) {
    case 'stylish':
      return stylish(ast);
    case 'plain':
      return plain(ast);
    default:
      throw new Error('Unknow formatter');
  }
};

export default getFormattedTree;
