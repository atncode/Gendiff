#!/usr/bin/env node

import pkg from 'commander';
import genDiff from '../src/index.js';

const { Command } = pkg;
const program = new Command();

program
  .version('0.1.0')
  .description('Usage: gendiff [options] <filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format[stylish, plain, json]', 'stylish')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2, program.format);
    console.log(result);
  });

program.parse(process.argv);
