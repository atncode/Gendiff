import _ from 'lodash';

const diff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2);

  return _.sortBy(keys).flatMap((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!_.has(obj1, key)) {
      return { key, value: value2, state: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: value1, state: 'removed' };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, children: diff(value1, value2), state: 'nested' };
    }
    if (value1 !== value2) {
      return {
        key, value1, value2, state: 'updated',
      };
    }
    if (value1 === value2) {
      return {
        key, value: value1, state: 'unchanged',
      };
    }
    return 'unknown case';
  });
};

export default diff;
