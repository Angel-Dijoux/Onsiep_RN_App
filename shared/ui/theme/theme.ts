import { createTheme, useTheme } from "@shopify/restyle";
import { ImageStyle, TextStyle, ViewStyle } from "react-native";

import { borderRadii } from "./borderRadii";
import { colors } from "./colors";
import { textVariants } from "./fonts";
import { spacing } from "./spacing";
import { zIndices } from "./zIndices";
import { buttonVariants } from "../button/buttonVariants";

export type Theme = typeof theme;

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export const theme = createTheme({
  colors,
  spacing,
  borderRadii,
  textVariants,
  breakpoint: {},
  buttonVariants,
  zIndices,
});

export const useAppTheme = () => useTheme<Theme>();

export const makeAppStyles =
  <T extends NamedStyles<T>>(styles: (appTheme: Theme) => T) =>
  () => {
    const restyleTheme = useAppTheme();

    return styles(restyleTheme);
  };
