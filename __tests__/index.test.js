import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import parse from '../src/parsers.js';
import diff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const stylish = fs.readFileSync(getFixturePath('stylish'), 'utf-8');
const plain = fs.readFileSync(getFixturePath('plain'), 'utf-8');
const json = fs.readFileSync(getFixturePath('json'), 'utf-8');

test.each([
  ['file1.json', 'file2.json'],
  ['file1.yaml', 'file2.yaml'],
  // ['file1.json', 'file2.json'],
  // ['file1.json', 'file2.json'],
])('check(%s, %s)', (filename1, filename2) => {
  const path1 = getFixturePath(filename1);
  const path2 = getFixturePath(filename2);
  expect(diff(parse(path1), parse(path2), 'stylish')).toBe(stylish);
  expect(diff(parse(path1), parse(path2), 'stylish')).toBe(stylish);
  expect(diff(parse(path1), parse(path2), 'plain')).toBe(plain);
  expect(diff(parse(path1), parse(path2), 'json')).toBe(json);
});
