const GREY = {
  GREY_DARK: "#020000",
  GREY_90: "#29282b",
  GREY_65: "#4d4d54",
  GREY_40: "#72727d",
  GREY_20: "#9797a6",
  GREY_10: "#bbbdcf",
};

const PRIMARY = {
  PRIMARY_DARK: "#e10720",
  PRIMARY_100: "#e42d3f",
  PRIMARY_80: "#e7505d",
  PRIMARY_50: "#ea747b",
  PRIMARY_40: "#ed9898",
  PRIMARY_10: "#f0bcb6",
};

const SECONDARY = {
  SECONDARY_DARK: "#ffd40d",
  SECONDARY_BASE: "#ffde47",
  SECONDARY_50: "#ffe87f",
  SECONDARY_40: "#fff1b6",
  SECONDARY_10: "#fffbee",
};

const THIRD = {
  THIRD_DARK: "#0d7b92",
  THIRD_BASE: "#4699ab",
  THIRD_50: "#7cb7c3",
  THIRD_40: "#b3d4dc",
  THIRD_10: "#e9f1f4",
};

const SEMANTIC = {
  SUCCESS: "##6dff66",
  SUCCESS_50: "#d0ffcc",
  ERROR: "#e48a7d",
  ERROR_50: "#f9d8d3",
  WARNING: "#ffe792",
  WARNING_50: "#fff7dd",
  INFO: "#a8c9d3",
  INFO_50: "#e9f1f4",
};

const GLOBALS = {
  BLACK: "#000",
  WHITE: "#FFFBEE",
};

const TRANSPARENT = {
  TRANSPARENT_10: "rgba(255,255,255,0.10)",
  TRANSPARENT_60: "rgba(255,255,255,0.60)",
  TRANSPARENT_80: "rgba(255,255,255,0.80)",
};

const colors = {
  ...GREY,
  ...PRIMARY,
  ...SECONDARY,
  ...THIRD,
  ...SEMANTIC,
  ...GLOBALS,
  ...TRANSPARENT,
};

export type Colors = keyof typeof colors;

export { colors };
