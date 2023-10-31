const GREY = {
  GREY: "#7b7b7b",
  GREY_DARK: "#1b1c1f",
  GREY_SAND: "#7c7b74",
  GREY_SEND_DARK: "#2a2a28",
};

const PRIMARY = {
  PRIMARY_1: "#14120b",
  PRIMARY_2: "#1b180f",
  PRIMARY_3: "#2d2305",
  PRIMARY_4: "#362b00",
  PRIMARY_5: "#433500",
  PRIMARY_6: "#524202",
  PRIMARY_7: "#665417",
  PRIMARY_8: "#836a21",
  PRIMARY_9: "#ffe629",
  PRIMARY_10: "#ffff57",
  PRIMARY_11: "#f5e147",
  PRIMARY_12: "#f6eeb4",
};

const SEMANTIC = {
  SUCCESS: "#d0ffcc",
  ERROR: "#f9d8d3",
  WARNING: "#fff7dd",
  INFO: "#e9f1f4",
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
  ...SEMANTIC,
  ...GLOBALS,
  ...TRANSPARENT,
};

export type Colors = keyof typeof colors;
