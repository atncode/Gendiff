import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import parse from '../src/parsers.js';
import expected from '../__fixtures__/expected_file.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('compare JSON files', () => {
  const actual = genDiff(parse(getFixturePath('file1.json')), parse(getFixturePath('file2.json')));
  expect(actual).toEqual(expected);
});

test('compare YAML files', () => {
  const actual = genDiff(parse(getFixturePath('file1.yaml')), parse(getFixturePath('file2.yaml')));
  expect(actual).toEqual(expected);
});
