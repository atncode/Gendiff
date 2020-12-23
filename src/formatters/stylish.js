import _ from 'lodash';

const getCurrentIndent = (depth, state, replacer = ' ', spacesCount = 4) => {
  const states = ['added', 'removed', 'updated'];
  const indentSize = states.includes(state) ? ((depth * spacesCount) - 2) : (depth * spacesCount);
  return replacer.repeat(indentSize);
};

const getBracketIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount - spacesCount);

const getValue = (value, depth) => {
  const { state } = value;
  const currentIndent = getCurrentIndent(depth, state);
  const entries = _.entries(value);

  const res = entries.flatMap(([currentKey, currentValue]) => {
    const val = currentValue instanceof Object ? getValue(currentValue, depth + 1) : currentValue;
    return `${currentIndent}${currentKey}: ${val}`;
  });
  return ['{', ...res, `${getBracketIndent(depth)}}`].join('\n');
};

const check = (value, depth) => (value instanceof Object ? getValue(value, depth) : value);

const formatter = (ast) => {
  const iter = (currentValue, depth) => {
    const res = currentValue.flatMap((obj) => {
      const { key, value, state } = obj;
      const currentIndent = getCurrentIndent(depth, state);
      const val = check(value, depth + 1);

      let line;
      if (state === 'added') {
        line = `${currentIndent}+ ${key}: ${val}`;
      }
      if (state === 'removed') {
        line = `${currentIndent}- ${key}: ${val}`;
      }
      if (state === 'unchanged') {
        line = `${currentIndent}${key}: ${val}`;
      }
      if (state === 'updated') {
        const { value1, value2 } = obj;
        const val1 = check(value1, depth + 1);
        const val2 = check(value2, depth + 1);
        line = `${currentIndent}- ${key}: ${val1}\n${currentIndent}+ ${key}: ${val2}`;
      }
      if (state === 'nested') {
        const { children } = obj;
        line = `${currentIndent}${key}: ${iter(children, depth + 1)}`;
      }
      return line;
    });
    return ['{', ...res, `${getBracketIndent(depth)}}`].join('\n');
  };

  return iter(ast, 1);
};

export default formatter;
