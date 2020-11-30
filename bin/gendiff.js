#!/usr/bin/env node

import { Command } from 'commander';
import parse from '../src/parser.js';
import genDiff from '../src/dif.js';

const program = new Command();

const obj1 = parse('./file1.json');
const obj2 = parse('./file2.json');

program
  .version('0.0.1')
  .description('Usage: gendiff [options] <filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action(genDiff(obj1, obj2));

program.parse(process.argv);

if (!program.args.length) program.help();
console.log(process.argv);
