import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { BackHandler, Pressable } from "react-native";
import { Box } from "../primitives";

type ReturnButtonType = {
  goBack?: boolean;
  colorScheme?: "light" | "dark";
  onPress: () => void;
};

export const ReturnButton = ({
  goBack = true,
  colorScheme = "light",
  onPress,
}: ReturnButtonType) => {
  useFocusEffect(
    useCallback(() => {
      const preventBackpressBubbleUp = () => (goBack ? false : true);

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        preventBackpressBubbleUp
      );

      return () => subscription.remove();
    }, [goBack])
  );

  if (!goBack) {
    return null;
  }

  return (
    <Pressable onPress={onPress}>
      <Box></Box>
    </Pressable>
  );
};
