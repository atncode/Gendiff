import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (ast) => {
  const iter = (currentValue, accKeys) => {
    const lines = currentValue.flatMap((obj) => {
      const {
        key, value, value1, value2, state, children,
      } = obj;
      const currentKey = accKeys.length === 0 ? key : `${accKeys}.${key}`;
      switch (state) {
        case 'nested':
          return iter(children, `${currentKey}`);
        case 'added':
          return `Property '${currentKey}' was added with value: ${stringify(value)}`;
        case 'removed':
          return `Property '${currentKey}' was removed`;
        case 'updated':
          return `Property '${currentKey}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown state ${state}!`);
      }
    });
    return lines
      .filter((line) => line !== null)
      .join('\n');
  };
  return iter(ast, '');
};

export default plain;
