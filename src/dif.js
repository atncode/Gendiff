import _ from 'lodash';

const genDiff = (json1, json2) => {
  const keys1 = _.keys(json1);
  const keys2 = _.keys(json2);
  const keys = _.union(keys1, keys2);

  const dif = keys.reduce((acc, key) => {
    if (!_.has(json1, key)) {
      acc.push(`  + ${key}: ${json2[key]}`);
    } else if (!_.has(json2, key)) {
      acc.push(`  - ${key}: ${json1[key]}`);
    } else if (json1[key] !== json2[key]) {
      acc.push(`  - ${key}: ${json1[key]}`);
      acc.push(`  + ${key}: ${json2[key]}`);
    } else {
      acc.push(`    ${key}: ${json1[key]}`);
    }
    return acc;
  }, []);

  return `{\n${dif.join('\n')}\n}`;
};

export default genDiff;
