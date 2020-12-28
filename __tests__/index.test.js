import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import diff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const stylish = fs.readFileSync(getFixturePath('stylish'), 'utf-8');
const plain = fs.readFileSync(getFixturePath('plain'), 'utf-8');
const json = fs.readFileSync(getFixturePath('json'), 'utf-8');

test.each([
  ['json', 'yaml'],
])('check(%s, %s)', (jsonExtension, yamlExtension) => {
  const json1 = getFixturePath(`file1.${jsonExtension}`);
  const json2 = getFixturePath(`file2.${jsonExtension}`);
  const yaml1 = getFixturePath(`file1.${yamlExtension}`);
  const yaml2 = getFixturePath(`file2.${yamlExtension}`);
  expect(diff(json1, json2, 'stylish')).toBe(stylish);
  expect(diff(yaml1, yaml2, 'stylish')).toBe(stylish);
  expect(diff(json1, json2, 'plain')).toBe(plain);
  expect(diff(yaml1, yaml2, 'plain')).toBe(plain);
  expect(diff(json1, json2, 'json')).toBe(json);
  expect(diff(yaml1, yaml2, 'json')).toBe(json);
});
