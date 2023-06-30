import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { BackHandler, Pressable } from "react-native";

import { Box } from "../primitives";
import { colors } from "../primitives/theme/colors";
import { spacing } from "../primitives/theme/spacing";

type ReturnButtonType = {
  goBack?: boolean;
  colorScheme?: "light" | "dark";
  onPress: () => void;
};

export const ReturnButton = ({
  goBack = true,
  colorScheme = "dark",
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
      <Box
        justifyContent="center"
        alignItems="center"
        padding="global_5"
        borderColor="GREY_DARK"
        borderWidth={1}
        borderRadius="round"
      >
        <Ionicons
          name="arrow-back"
          size={spacing.global_24}
          color={colorScheme === "light" ? colors.GREY_DARK : colors.WHITE}
        />
      </Box>
    </Pressable>
  );
};
