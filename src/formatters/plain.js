import _ from 'lodash';

const check = (value) => {
  switch (true) {
    case _.isObject(value):
      return '[complex value]';

    case _.isBoolean(value):
    case _.isNumber(value):
    case _.isNull(value):
      return value;

    default:
      return `'${value}'`;
  }
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
          return `Property '${currentKey}' was added with value: ${check(value)}`;
        case 'removed':
          return `Property '${currentKey}' was removed`;
        case 'updated':
          return `Property '${currentKey}' was updated. From ${check(value1)} to ${check(value2)}`;
        case 'unchanged':
          return 'without changes';
        default:
          throw new Error(`Unknown state ${state}!`);
      }
    });
    return lines
      .filter((line) => line !== 'without changes')
      .join('\n');
  };
  return iter(ast, '');
};

export default plain;
