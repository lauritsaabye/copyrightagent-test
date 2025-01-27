#!/usr/bin/env node
const { Command } = require('commander');

const { getColor } = require('./apiMock');
const { convertColorObj } = require('./helpers');

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
  .option('-r, --RGB', 'Include RGB representation')
  .option('-h, --hex', 'Include hex representation');

convert
  .command('seq')
  .description('Converts colors sequentially')
  .argument('<colors...>', 'The list of colors')
  .action(async (colors) => {
    for (const color of colors) {
      const colorObj = await getColor(color);
      const colorOutput = convertColorObj(colorObj, convert.opts());
      console.log(colorOutput);
    }
  });

convert
  .command('par')
  .description('Converts colors in parallel')
  .argument('<colors...>', 'The list of colors')
  .action(async (colors) => {
    const colorsOutput = await Promise.all(
      colors.map(async (color) => {
        const colorObj = await getColor(color);
        return convertColorObj(colorObj, convert.opts());
      })
    );
    console.log(colorsOutput);
  });

program.parse();
