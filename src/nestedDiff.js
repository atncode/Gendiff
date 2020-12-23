import _ from 'lodash';

const diff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2).sort();

  return keys.flatMap((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    let leaf;

    switch (true) {
      case (value1 instanceof Object) && (value2 instanceof Object):
        leaf = { key, children: diff(value1, value2), state: 'nested' };
        break;

      case !_.has(obj1, key):
        leaf = { key, value: value2, state: 'added' };
        break;

      case !_.has(obj2, key):
        leaf = { key, value: value1, state: 'removed' };
        break;

      case value1 === value2:
        leaf = { key, value: value1, state: 'unchanged' };
        break;

      case value1 !== value2:
        leaf = {
          key, value1, value2, state: 'updated',
        };
        break;

      default:
        console.log('This state does not exists');
        break;
    }
    return leaf;
  });
};

export default diff;
