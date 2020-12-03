import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.union(keys1, keys2).sort();

  const dif = keys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      acc.push(`  + ${key}: ${obj2[key]}`);
    } else if (!_.has(obj2, key)) {
      acc.push(`  - ${key}: ${obj1[key]}`);
    } else if (obj1[key] !== obj2[key]) {
      acc.push(`  - ${key}: ${obj1[key]}`);
      acc.push(`  + ${key}: ${obj2[key]}`);
    } else {
      acc.push(`    ${key}: ${obj1[key]}`);
    }
    return acc;
  }, []);

  return `{\n${dif.join('\n')}\n}`;
};

export default genDiff;
