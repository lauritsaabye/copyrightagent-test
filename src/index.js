#!/usr/bin/env node
const { Command } = require('commander');

const {
  convertAndOutputColorsInSeries,
  convertAndOutputColorsInParallel,
} = require('./lib/convert');

const program = new Command();
program
  .name('color-util')
  .description('Your one stop CLI for all things related to colors')
  .version('1.0.0');

const convert = program
  .command('convert')
  .description(
    'Converts a list of colors into a list of corresponding hex and/or rgb representation'
  )
  .option('-r, --rgb', 'Include rgb representation')
  .option('-h, --hex', 'Include hex representation');

convert
  .command('seq')
  .description('Converts colors sequentially')
  .argument('<colors...>', 'The list of colors')
  .action(async (colors) => {
    await convertAndOutputColorsInSeries(colors, convert.opts());
  });

convert
  .command('par')
  .description('Converts colors in parallel')
  .argument('<colors...>', 'The list of colors')
  .action(async (colors) => {
    await convertAndOutputColorsInParallel(colors, convert.opts());
  });

program.parse();
