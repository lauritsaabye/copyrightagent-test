/**
 * Converts a color object into a representation based on specified options.
 *
 * @param {Object} colorObj - The color object containing name, HEX, and RGB properties.
 * @param {Object} options - The options specifying the desired output format.
 * @param {boolean} [options.hex] - If `true`, include HEX representation in the output.
 * @param {boolean} [options.rgb] - If `true`, include RGB representation in the output.
 * @returns {Object} The converted color object.
 *
 * @example
 * const colorObj = { name: 'red', HEX: '#ff0000', RGB: { R: 255, G: 0, B: 0 } };
 * const options = { hex: true };
 * const result = convertColorObj(colorObj, options);
 * console.log(result); // { name: 'red', hex: '#ff0000' }
 */
const convertColorObj = (colorObj, options) => ({
  name: colorObj.name,
  ...(options?.hex && { hex: colorObj.HEX }),
  ...(options?.rgb && { rgb: colorObj.RGB }),
});

module.exports = {
  convertColorObj,
};
