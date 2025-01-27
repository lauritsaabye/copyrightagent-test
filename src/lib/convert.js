const { getColor } = require('../apiMock');
const { convertColorObj } = require('./helpers');
const { OPTIONS_NOT_DEFINED_ERROR } = require('./errors');

/**
 * Converts a list of colors into their specified representations (HEX and/or RGB) in parallel
 * and outputs the results to the console.
 *
 * @async
 * @function
 * @param {string[]} colors - An array of color names to be processed (e.g., ['red', 'blue']).
 * @param {Object} options - Configuration options for the conversion.
 * @param {boolean} [options.hex] - If `true`, include HEX representation in the output.
 * @param {boolean} [options.rgb] - If `true`, include RGB representation in the output.
 * @throws {Error} Throws an error if neither `hex` nor `rgb` is specified in the options.
 * @returns {Promise<void>} Resolves when all colors are processed and logged to the console.
 */
const convertAndOutputColorsInParallel = async (colors, options) => {
  if (!options.hex && !options.rgb) {
    throw new Error(OPTIONS_NOT_DEFINED_ERROR);
  }
  const colorsOutput = await Promise.all(
    colors.map(async (color) => {
      const colorObj = await getColor(color);
      return convertColorObj(colorObj, options);
    })
  );
  console.log(colorsOutput);
};

/**
 * Converts a list of colors into their specified representations (hex and/or RGB) sequentially
 * and outputs each result to the console as they are processed.
 *
 * @async
 * @function
 * @param {string[]} colors - An array of color names to be processed (e.g., ['red', 'blue']).
 * @param {Object} options - Configuration options for the conversion.
 * @param {boolean} [options.hex] - If `true`, include HEX representation in the output.
 * @param {boolean} [options.rgb] - If `true`, include RGB representation in the output.
 * @throws {Error} Throws an error if neither `hex` nor `rgb` is specified in the options.
 * @returns {Promise<void>} Resolves when all colors have been processed and logged to the console.
 */

const convertAndOutputColorsInSeries = async (colors, options) => {
  if (!options.hex && !options.rgb) {
    throw new Error(OPTIONS_NOT_DEFINED_ERROR);
  }
  for (const color of colors) {
    const colorObj = await getColor(color);
    const colorOutput = convertColorObj(colorObj, options);
    console.log(colorOutput);
  }
};

module.exports = {
  convertAndOutputColorsInParallel,
  convertAndOutputColorsInSeries,
};
