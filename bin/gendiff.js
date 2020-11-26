#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .version('0.0.1')
  .description('Usage: gendiff [options]')
  .description('Compares two configuration files and shows a difference.')

program.parse(process.argv);

if (!program.args.length) program.help();
