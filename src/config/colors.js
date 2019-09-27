export default {
  white: '#ffffff',
  grey: '#636363',
  gradientTop: '#f36862',
  gradientBottom: '#f793e0',
  hexToRgb: (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  },
  darken: (color, percentage) => {
    const { r, g, b } = this.hexToRgb(color);
    return [r, g, b].map((colorPart, index) => {
      const mixedColorPart = Math.floor(colorPart + (0 - colorPart) * (percentage / 100.0)).toString(16);
      if (mixedColorPart.length < 2) return !index ? `#0${mixedColorPart}` : `0${mixedColorPart}`;
      return !index ? `#${mixedColorPart}` : mixedColorPart;
    }).join('');
  },
};
