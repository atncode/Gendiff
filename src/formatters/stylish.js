import _ from 'lodash';

const getCurrentIndent = (depth, state, replacer = ' ', spacesCount = 4) => {
  const states = ['added', 'removed', 'updated'];
  const indentSize = states.includes(state) ? ((depth * spacesCount) - 2) : (depth * spacesCount);
  return replacer.repeat(indentSize);
};

const getBracketIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - spacesCount);

const getFormattedValue = (value, depth) => {
  const { state } = value;
  const entries = _.entries(value);

  const result = entries.flatMap(([currentKey, currentValue]) => {
    const val = _.isObject(currentValue)
      ? getFormattedValue(currentValue, depth + 1)
      : currentValue;
    return `${getCurrentIndent(depth, state)}${currentKey}: ${val}`;
  });
  return ['{', ...result, `${getBracketIndent(depth)}}`].join('\n');
};

const getValue = (value, depth) => (_.isObject(value) ? getFormattedValue(value, depth) : value);

const formatter = (ast) => {
  const iter = (currentValue, depth) => {
    const result = currentValue.flatMap((obj) => {
      const {
        key, value, value1, value2, state, children,
      } = obj;
      const val = getValue(value, depth + 1);
      const val1 = getValue(value1, depth + 1);
      const val2 = getValue(value2, depth + 1);
      switch (state) {
        case 'added':
          return `${getCurrentIndent(depth, state)}+ ${key}: ${val}`;
        case 'removed':
          return `${getCurrentIndent(depth, state)}- ${key}: ${val}`;
        case 'unchanged':
          return `${getCurrentIndent(depth, state)}${key}: ${val}`;
        case 'updated':
          return `${getCurrentIndent(depth, state)}- ${key}: ${val1}\n${getCurrentIndent(depth, state)}+ ${key}: ${val2}`;
        case 'nested':
          return `${getCurrentIndent(depth, state)}${key}: ${iter(children, depth + 1)}`;
        default:
          throw new Error(`Unknown state ${state}!`);
      }
    });
    return ['{', ...result, `${getBracketIndent(depth)}}`].join('\n');
  };

  return iter(ast, 1);
};

export default formatter;
