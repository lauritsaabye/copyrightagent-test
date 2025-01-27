/**
 * Converts a color object into a representation based on specified options.
 *
 * @param {Object} colorObj - The color object containing name, HEX, and RGB properties.
 * @param {Object} options - The options specifying the desired output format.
 * @returns {Object} The converted color object.
 *
 * @example
 * const colorObj = { name: 'red', HEX: '#ff0000', RGB: 'rgb(255, 0, 0)' };
 * const options = { hex: true, RGB: true };
 * const result = convertColorObj(colorObj, options);
 * console.log(result); // { name: 'red', hex: '#ff0000', rgb: 'rgb(255, 0, 0)' }
 */
const convertColorObj = (colorObj, options) => ({
  name: colorObj.name,
  ...(options?.hex && { hex: colorObj.HEX }),
  ...(options?.RGB && { rgb: colorObj.RGB }),
});

module.exports = {
  convertColorObj,
};
