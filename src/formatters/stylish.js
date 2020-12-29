import _ from 'lodash';

const getCurrentIndent = (depth, state, replacer = ' ', spacesCount = 4) => {
  const states = ['added', 'removed', 'updated'];
  const indentSize = states.includes(state) ? ((depth * spacesCount) - 2) : (depth * spacesCount);
  return replacer.repeat(indentSize);
};

const getBracketIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - spacesCount);

const getValue = (value, depth) => {
  const { state } = value;
  const entries = _.entries(value);

  const res = entries.flatMap(([currentKey, currentValue]) => {
    const val = _.isObject(currentValue) ? getValue(currentValue, depth + 1) : currentValue;
    return `${getCurrentIndent(depth, state)}${currentKey}: ${val}`;
  });
  return ['{', ...res, `${getBracketIndent(depth)}}`].join('\n');
};

const check = (value, depth) => (_.isObject(value) ? getValue(value, depth) : value);

const formatter = (ast) => {
  const iter = (currentValue, depth) => {
    const res = currentValue.flatMap((obj) => {
      const {
        key, value, value1, value2, state, children,
      } = obj;
      const val = check(value, depth + 1);
      const val1 = check(value1, depth + 1);
      const val2 = check(value2, depth + 1);
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
    return ['{', ...res, `${getBracketIndent(depth)}}`].join('\n');
  };

  return iter(ast, 1);
};

export default formatter;
