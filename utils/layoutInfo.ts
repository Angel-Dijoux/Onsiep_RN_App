import { LayoutChangeEvent } from "react-native";

export const getItemSize = (event: LayoutChangeEvent) => {
  const { width, height } = event.nativeEvent.layout;
  console.log(`Item size: WIDTH: ${width}; HEIGHT: ${height}`);
};
