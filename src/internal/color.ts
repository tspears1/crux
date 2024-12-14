const isRGB = (color: string) => color.match(/^rgb\(\d+,\s*\d+,\s*\d+\)$/);
const isRGBA = (color: string) =>
  color.match(/^rgba\(\d+,\s*\d+,\s*\d+,\s*\d+\.\d+\)$/);
const isHSL = (color: string) => color.match(/^hsl\(\d+,\s*\d+%,\s*\d+%\)$/);
const isHSLA = (color: string) =>
  color.match(/^hsla\(\d+,\s*\d+%,\s*\d+%,\s*\d+\.\d+\)$/);

const isHex = (color: string) => color.match(/^#([0-9a-f]{3}){1,2}$/i);

const rgbToHex = (rgb: string) => {
  if (!isRGB(rgb)) return;
  const colors = rgb.match(/\d+/g)?.map(Number);
  if (!colors) return;
  const [r, g, b] = colors;
  return `#${r.toString(16).padStart(2, "0")}${
    g.toString(16).padStart(2, "0")
  }${b.toString(16).padStart(2, "0")}`;
};

export { rgbToHex, isRGB, isRGBA, isHSL, isHSLA, isHex };
