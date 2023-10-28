const GREY = {
  GREY_DARK: "#1b1c1f",
  GREY_90: "#1B180F",
  GREY_65: "#4c4e56",
  GREY_40: "#66687a",
  GREY_20: "#9797a6",
  GREY_10: "#9799b8",
};

const PRIMARY = {
  PRIMARY_DARK: "#14120B", // 1
  PRIMARY_100: "#1B180F", // 2
  PRIMARY_80: "#2D2305", // 3
  PRIMARY_6: "#FFAA001E",
  PRIMARY_8: "#836A21",
  PRIMARY_50: "#FFE629", // 9
  PRIMARY_40: "#ed9898",
  PRIMARY_10: "#f0bcb6",
  PRIMARY: "#FEF6BAF6" // last
};

const SECONDARY = {
  SECONDARY_40: "#fff1b6",
  SECONDARY_10: "#fffbee",
};

const THIRD = {
  THIRD_40: "#b3d4dc",
  THIRD_10: "#e9f1f4",
};

const SEMANTIC = {
  SUCCESS: "#6dff66",
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
  WHITE: "#FFF",
};

const TRANSPARENT = {
  TRANSPARENT_10: "rgba(255,255,255,0.10)",
  TRANSPARENT_60: "rgba(255,255,255,0.60)",
  TRANSPARENT_80: "rgba(255,255,255,0.80)",
};

export const colors = {
  ...GREY,
  ...PRIMARY,
  ...SECONDARY,
  ...THIRD,
  ...SEMANTIC,
  ...GLOBALS,
  ...TRANSPARENT,
};

export type Colors = keyof typeof colors;
