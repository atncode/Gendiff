import fs from 'fs';
import path from 'path';

export default (filename) => {
  const absolutePath = path.resolve(filename);
  const file = fs.readFileSync(absolutePath, 'utf-8');
  const obj = JSON.parse(file);
  return obj;
};
