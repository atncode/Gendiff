import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import parse from '../src/parser.js';
import expected from '../__fixtures__/expected_file.js';

test('compare JSON files', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const actual = genDiff(parse(getFixturePath('file1.json')), parse(getFixturePath('file2.json')));
  expect(actual).toEqual(expected);
});
