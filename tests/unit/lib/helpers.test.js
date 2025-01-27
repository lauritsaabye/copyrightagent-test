const helpers = require('../../../src/lib/helpers');

describe('convertColorObj', () => {
  const sampleColorObj = {
    name: 'red',
    HEX: '#ff0000',
    RGB: { R: 255, G: 0, B: 0 }
  };

  it('should include only the name when no options are provided', () => {
    const options = {};
    const result = helpers.convertColorObj(sampleColorObj, options);
    expect(result).toEqual({ name: 'red' });
  });

  it('should include only the HEX representation when options.hex is true', () => {
    const options = { hex: true };
    const result = helpers.convertColorObj(sampleColorObj, options);
    expect(result).toEqual({ name: 'red', hex: '#ff0000' });
  });

  it('should include only the RGB representation when options.RGB is true', () => {
    const options = { rgb: true };
    const result = helpers.convertColorObj(sampleColorObj, options);
    expect(result).toEqual({ name: 'red', rgb: { R: 255, G: 0, B: 0 } });
  });

  it('should include both the HEX and the RGB representations when both options are true', () => {
    const options = { hex: true, rgb: true };
    const result = helpers.convertColorObj(sampleColorObj, options);
    expect(result).toEqual({
      name: 'red',
      hex: '#ff0000',
      rgb: { R: 255, G: 0, B: 0 },
    });
  });

  it('should return an object with only the name if options are undefined', () => {
    const result = helpers.convertColorObj(sampleColorObj, undefined);
    expect(result).toEqual({ name: 'red' });
  });

  it('should return an object with only the name if options are not relevant', () => {
    const result = helpers.convertColorObj(sampleColorObj, { nonRelevantKey: true });
    expect(result).toEqual({ name: 'red' });
  });
});
