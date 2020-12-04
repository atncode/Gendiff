#!/usr/bin/env node

import { Command } from 'commander';
import parse from '../src/parsers.js';
import genDiff from '../src/index.js';

const program = new Command();

program
  .version('0.1.0')
  .description('Usage: gendiff [options] <filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(genDiff(parse(filepath1), parse(filepath2)));
  });

program.parse(process.argv);
