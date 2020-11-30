import fs from 'fs';
import path from 'path';

export default (fileName) => {
  const absolutePath = path.resolve(fileName);
  const file = fs.readFileSync(absolutePath, 'utf-8');
  const obj = JSON.parse(file);
  return obj;
};
