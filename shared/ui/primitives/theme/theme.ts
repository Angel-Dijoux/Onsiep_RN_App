import { createTheme, useTheme } from "@shopify/restyle";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

import { borderRadii } from "./borderRadii";
import { breakpoints } from "./breakpoints";
import { colors } from "./colors";
import { textVariants } from "./fonts";
import { spacing } from "./spacing";
import { zIndices } from "./zIndices";

export type Theme = typeof theme;

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export const theme = createTheme({
  colors,
  spacing,
  borderRadii,
  textVariants,
  breakpoints,
  zIndices,
});

export const useAppTheme = () => useTheme<Theme>();

export const makeAppStyles =
  <T extends NamedStyles<T>>(styles: (appTheme: Theme) => T) =>
  () => {
    const restyleTheme = useAppTheme();

    return styles(restyleTheme);
  };
