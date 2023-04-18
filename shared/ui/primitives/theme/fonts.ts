export const fontFamily = {
  satoshi: "Satoshi",
  manrope: "Manrope",
};

const fontSizes = {
  h1: 56,
  h2: 36,
  h3: 24,
  xlarge: 20,
  large: 16,
  regular: 14,
  small: 13,
  xsmall: 12,
};

const lineHeight = {
  h1: 67,
  h2: 43,
  h3: 29,
  xlarge: 24,
  large: 19,
  regular: 17,
  small: 16,
  xsmall: 14,
};

const titleVariant = {
  fontFamily: fontFamily.satoshi,
  fontWeight: "700" as const,
  color: "WHITE",
};

const baseVariant = {
  fontFamily: fontFamily.manrope,
  fontWeight: "400" as const,
  color: "WHITE",
};

const textVariants = {
  h1: {
    ...titleVariant,
    fontSize: fontSizes.h1,
    lineHeight: lineHeight.h1,
  },
  h2: {
    ...titleVariant,
    fontSize: fontSizes.h2,
    lineHeight: lineHeight.h2,
  },
  h3: {
    ...titleVariant,
    fontSize: fontSizes.h3,
    lineHeight: lineHeight.h3,
  },
  xlarge: {
    ...baseVariant,
    fontSize: fontSizes.xlarge,
    lineHeight: lineHeight.xlarge,
  },
  large: {
    ...baseVariant,
    fontSize: fontSizes.large,
    lineHeight: lineHeight.large,
  },
  regular: {
    ...baseVariant,
    fontSize: fontSizes.regular,
    lineHeight: lineHeight.regular,
  },
  small: {
    ...baseVariant,
    fontSize: fontSizes.small,
    lineHeight: lineHeight.small,
  },
  xsmall: {
    ...baseVariant,
    fontSize: fontSizes.xsmall,
    lineHeight: lineHeight.xsmall,
  },
};

export type FontSizes = keyof typeof fontSizes;

export { textVariants };
