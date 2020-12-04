import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filename) => {
  const absolutePath = path.resolve(filename);
  const file = fs.readFileSync(absolutePath, 'utf-8');
  const format = path.extname(filename);
  let data;
  if (format === '.json') {
    data = JSON.parse(file);
  } else if (format === '.yaml') {
    data = yaml.safeLoad(file);
  }
  return data;
};
