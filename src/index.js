import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from './flatDiff.js';
import buldAST from './nestedDiff.js';
import parse from './parsers.js';
import formatter from './stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const obj1 = parse(getFixturePath('file1.json'));
const obj2 = parse(getFixturePath('file2.json'));

const ast = buldAST(obj1, obj2);
const formattedFilesDifference = formatter(ast);

const getFilesDifference = genDiff(obj1, obj2);

export { getFilesDifference, formattedFilesDifference };
