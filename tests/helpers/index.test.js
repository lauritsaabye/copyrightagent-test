const helpers = require('../../src/helpers');

describe('convertColorObj', () => {
  const sampleColorObj = {
    name: 'red',
    HEX: '#FF0000',
    RGB: 'rgb(255, 0, 0)',
  };

  it('should include only the name when no options are provided', () => {
    const options = {};
    const result = helpers.convertColorObj(sampleColorObj, options);
    expect(result).toEqual({ name: 'red' });
  });

  it('should include only the HEX representation when options.hex is true', () => {
    const options = { hex: true };
    const result = helpers.convertColorObj(sampleColorObj, options);
    expect(result).toEqual({ name: 'red', hex: '#FF0000' });
  });

  it('should include only the RGB representation when options.RGB is true', () => {
    const options = { RGB: true };
    const result = helpers.convertColorObj(sampleColorObj, options);
    expect(result).toEqual({ name: 'red', rgb: 'rgb(255, 0, 0)' });
  });

  it('should include both the HEX and the RGB representations when both options are true', () => {
    const options = { hex: true, RGB: true };
    const result = helpers.convertColorObj(sampleColorObj, options);
    expect(result).toEqual({
      name: 'red',
      hex: '#FF0000',
      rgb: 'rgb(255, 0, 0)',
    });
  });

  it('should return an object with only the name if options are undefined', () => {
    const result = helpers.convertColorObj(sampleColorObj, undefined);
    expect(result).toEqual({ name: 'red' });
  });
});
