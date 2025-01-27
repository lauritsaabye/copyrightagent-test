const {
  convertAndOutputColorsInParallel,
  convertAndOutputColorsInSeries,
} = require('../../../src/lib/convert');
const { getColor } = require('../../../src/apiMock');
const { OPTIONS_NOT_DEFINED_ERROR } = require('../../../src/lib/errors');

jest.mock('../../../src/apiMock');

describe('convert functions', () => {
  const log = console.log;
  getColor.mockImplementation((color) =>
    Promise.resolve({
      name: color,
      HEX: `${color}-hex-val`,
      RGB: `${color}-rgb-val`,
    })
  );
  beforeEach(() => {
    console.log = jest.fn();
    jest.clearAllMocks();
  });
  afterEach(() => {
    console.log = log;
  });

  describe('convertAndOutputColorsInParallel', () => {
    it('should convert the colors to hex and output as a single list when hex is set to true', async () => {
      const colors = ['red', 'green', 'blue'];
      const options = { hex: true };

      await convertAndOutputColorsInParallel(colors, options);

      expect(getColor).toHaveBeenCalledTimes(colors.length);

      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith([
        { name: 'red', hex: 'red-hex-val' },
        { name: 'green', hex: 'green-hex-val' },
        { name: 'blue', hex: 'blue-hex-val' },
      ]);
    });

    it('should convert the colors to rgb and output as a single list when rgb is set to true', async () => {
      const colors = ['red', 'green', 'blue'];
      const options = { rgb: true };

      await convertAndOutputColorsInParallel(colors, options);

      expect(getColor).toHaveBeenCalledTimes(colors.length);

      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith([
        { name: 'red', rgb: 'red-rgb-val' },
        { name: 'green', rgb: 'green-rgb-val' },
        { name: 'blue', rgb: 'blue-rgb-val' },
      ]);
    });

    it('should convert the colors to hex and rgb and output as a single list when both are set to true', async () => {
      const colors = ['red', 'green', 'blue'];
      const options = { hex: true, rgb: true };

      await convertAndOutputColorsInParallel(colors, options);

      expect(getColor).toHaveBeenCalledTimes(colors.length);

      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith([
        { name: 'red', rgb: 'red-rgb-val', hex: 'red-hex-val' },
        { name: 'green', rgb: 'green-rgb-val', hex: 'green-hex-val' },
        { name: 'blue', rgb: 'blue-rgb-val', hex: 'blue-hex-val' },
      ]);
    });

    it('should convert the colors to hex and rgb and output as a single list when both are set to true - ignoring other non relevant keys', async () => {
      const colors = ['red', 'green', 'blue'];
      const options = {
        hex: true,
        rgb: true,
        otherKeyThatShouldBeIgnored: true,
      };

      await convertAndOutputColorsInParallel(colors, options);

      expect(getColor).toHaveBeenCalledTimes(colors.length);

      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenCalledWith([
        { name: 'red', rgb: 'red-rgb-val', hex: 'red-hex-val' },
        { name: 'green', rgb: 'green-rgb-val', hex: 'green-hex-val' },
        { name: 'blue', rgb: 'blue-rgb-val', hex: 'blue-hex-val' },
      ]);
    });

    it('should throw an error when neither hex nor rgb is set', async () => {
      const colors = ['red', 'green', 'blue'];
      const options = {};

      await expect(
        convertAndOutputColorsInParallel(colors, options)
      ).rejects.toThrowError(OPTIONS_NOT_DEFINED_ERROR);
    });
  });

  describe('convertAndOutputColorsInSeries', () => {
    it('should convert the colors to hex and output each color as they are processed when hex is set to true', async () => {
      const colors = ['red', 'green', 'blue'];
      const options = { hex: true };

      await convertAndOutputColorsInSeries(colors, options);

      expect(getColor).toHaveBeenCalledTimes(colors.length);

      expect(console.log).toHaveBeenCalledTimes(colors.length);
      expect(console.log).toHaveBeenNthCalledWith(1, {
        name: 'red',
        hex: 'red-hex-val',
      });
      expect(console.log).toHaveBeenNthCalledWith(2, {
        name: 'green',
        hex: 'green-hex-val',
      });
      expect(console.log).toHaveBeenNthCalledWith(3, {
        name: 'blue',
        hex: 'blue-hex-val',
      });
    });

    it('should convert the colors to rgb and output each color as they are processed when rgb is set to true', async () => {
      const colors = ['red', 'green', 'blue'];
      const options = { rgb: true };

      await convertAndOutputColorsInSeries(colors, options);

      expect(getColor).toHaveBeenCalledTimes(colors.length);

      expect(console.log).toHaveBeenCalledTimes(colors.length);
      expect(console.log).toHaveBeenNthCalledWith(1, {
        name: 'red',
        rgb: 'red-rgb-val',
      });
      expect(console.log).toHaveBeenNthCalledWith(2, {
        name: 'green',
        rgb: 'green-rgb-val',
      });
      expect(console.log).toHaveBeenNthCalledWith(3, {
        name: 'blue',
        rgb: 'blue-rgb-val',
      });
    });

    it('should convert the colors to hex and rgb and output each color as they are processed when both are set to true', async () => {
      const colors = ['red', 'green', 'blue'];
      const options = { hex: true, rgb: true };

      await convertAndOutputColorsInSeries(colors, options);

      expect(getColor).toHaveBeenCalledTimes(colors.length);

      expect(console.log).toHaveBeenCalledTimes(colors.length);
      expect(console.log).toHaveBeenNthCalledWith(1, {
        name: 'red',
        rgb: 'red-rgb-val',
        hex: 'red-hex-val',
      });
      expect(console.log).toHaveBeenNthCalledWith(2, {
        name: 'green',
        rgb: 'green-rgb-val',
        hex: 'green-hex-val',
      });
      expect(console.log).toHaveBeenNthCalledWith(3, {
        name: 'blue',
        rgb: 'blue-rgb-val',
        hex: 'blue-hex-val',
      });
    });

    it('should convert the colors to hex and rgb and output each color as they are processed when both are set to true - ignoring other non relevant keys,', async () => {
      const colors = ['red', 'green', 'blue'];
      const options = {
        hex: true,
        rgb: true,
        otherKeyThatShouldBeIgnored: true,
      };

      await convertAndOutputColorsInSeries(colors, options);

      expect(getColor).toHaveBeenCalledTimes(colors.length);

      expect(console.log).toHaveBeenCalledTimes(colors.length);
      expect(console.log).toHaveBeenNthCalledWith(1, {
        name: 'red',
        rgb: 'red-rgb-val',
        hex: 'red-hex-val',
      });
      expect(console.log).toHaveBeenNthCalledWith(2, {
        name: 'green',
        rgb: 'green-rgb-val',
        hex: 'green-hex-val',
      });
      expect(console.log).toHaveBeenNthCalledWith(3, {
        name: 'blue',
        rgb: 'blue-rgb-val',
        hex: 'blue-hex-val',
      });
    });

    it('should throw an error when neither hex nor rgb is set', async () => {
      const colors = ['red', 'green', 'blue'];
      const options = {};

      await expect(
        convertAndOutputColorsInSeries(colors, options)
      ).rejects.toThrowError(OPTIONS_NOT_DEFINED_ERROR);
    });
  });
});
