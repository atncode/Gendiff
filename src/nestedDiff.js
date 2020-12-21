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
        leaf = { key, value: value1, state: 'deleted' };
        break;

      case value1 === value2:
        leaf = { key, value: value1, state: 'unchanged' };
        break;

      case value1 !== value2:
        leaf = {
          key, value1, value2, state: 'changed',
        };
        break;

      default:
        console.log('this state does not exists');
        break;
    }
    return leaf;

    // if ((value1 instanceof Object) && (value2 instanceof Object)) {
    //   return { key, children: diff(value1, value2), state: 'nested' };
    // }
    // if (!_.has(obj1, key)) {
    //   return { key, value: value2, state: 'added' };
    // }
    // if (!_.has(obj2, key)) {
    //   return { key, value: value1, state: 'deleted' };
    // }
    // if (value1 === value2) {
    //   return { key, value: value1, state: 'unchanged' };
    // }
    // if (value1 !== value2) {
    //   return {
    //     key, value1, value2, state: 'changed',
    //   };
  });
};

export default diff;
