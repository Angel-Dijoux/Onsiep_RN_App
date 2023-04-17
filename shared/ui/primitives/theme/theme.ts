import { createTheme, useTheme } from "@shopify/restyle";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

import { breakpoints } from "./breakpoints";
import { colors } from "./colors";
import { textVariants } from "./fonts";
import { radius } from "./radius";
import { spacing } from "./spacing";
import { zIndices } from "./zIndices";

export type Theme = typeof theme;

type NamedSyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export const theme = createTheme({
  colors,
  spacing,
  radius,
  textVariants,
  breakpoints,
  zIndices,
});

export const useAppTheme = () => useTheme<Theme>();

export const appStyle =
  <T extends NamedSyles<T>>(styles: (appTheme: Theme) => T) =>
  () => {
    const restyleTheme = useAppTheme();
    return styles(restyleTheme);
  };
