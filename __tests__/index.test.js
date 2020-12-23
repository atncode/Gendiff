import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import parse from '../src/parsers.js';
import diff from '../src/nestedDiff.js';
import formatter from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('compare JSON files', () => {
  const ast = diff(parse(getFixturePath('file1.json')), parse(getFixturePath('file2.json')));
  const actual = formatter(ast);
  const expected = fs.readFileSync(getFixturePath('expected_file'), 'utf-8');
  expect(actual).toEqual(expected);
});

test('compare YAML files', () => {
  const ast = diff(parse(getFixturePath('file1.yaml')), parse(getFixturePath('file2.yaml')));
  const actual = formatter(ast);
  const expected = fs.readFileSync(getFixturePath('expected_file'), 'utf-8');
  expect(actual).toEqual(expected);
});

test('plain', () => {
  const ast = diff(parse(getFixturePath('file1.json')), parse(getFixturePath('file2.json')));
  const actual = plain(ast);
  const expected = fs.readFileSync(getFixturePath('expected_plain'), 'utf-8');
  expect(actual).toEqual(expected);
});
