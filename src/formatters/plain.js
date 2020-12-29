import _ from 'lodash';

const check = (value) => {
  switch (true) {
    case _.isObject(value):
      return '[complex value]';

    case typeof value === 'boolean':
    case typeof value === 'number':
    case value === null:
      return value;

    default:
      return `'${value}'`;
  }
};

const plain = (ast) => {
  const iter = (currentValue, accKeys) => {
    const lines = currentValue.reduce((acc, obj) => {
      const { key, value, state } = obj;
      const currentKey = accKeys.length === 0 ? key : `${accKeys}.${key}`;
      if (state === 'nested') {
        const { children } = obj;
        acc.push(iter(children, `${currentKey}`));
      }
      if (state === 'added') {
        acc.push(`Property '${currentKey}' was added with value: ${check(value)}`);
      }
      if (state === 'removed') {
        acc.push(`Property '${currentKey}' was removed`);
      }
      if (state === 'updated') {
        const { value1, value2 } = obj;
        acc.push(`Property '${currentKey}' was updated. From ${check(value1)} to ${check(value2)}`);
      }
      return [...acc];
    }, []);
    return [...lines].join('\n');
  };
  return iter(ast, '');
};

export default plain;
