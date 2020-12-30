import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;
const correctiveIndent = 2;

const stringify = (value, currentDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(depth * spacesCount - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, currentDepth);
};

const formatter = (ast) => {
  const iter = (currentValue, depth) => {
    const indentSize = (depth * spacesCount) - correctiveIndent;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(depth * spacesCount - spacesCount);

    const result = currentValue.flatMap((obj) => {
      const {
        key, value, value1, value2, state, children,
      } = obj;
      switch (state) {
        case 'added':
          return `${currentIndent}+ ${key}: ${stringify(value, depth + 1)}`;
        case 'removed':
          return `${currentIndent}- ${key}: ${stringify(value, depth + 1)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${stringify(value, depth + 1)}`;
        case 'updated':
          return `${currentIndent}- ${key}: ${stringify(value1, depth + 1)}\n${currentIndent}+ ${key}: ${stringify(value2, depth + 1)}`;
        case 'nested':
          return `${currentIndent}  ${key}: ${iter(children, depth + 1)}`;
        default:
          throw new Error(`Unknown state ${state}!`);
      }
    });
    return ['{', ...result, `${bracketIndent}}`].join('\n');
  };

  return iter(ast, 1);
};

export default formatter;
