import { useNavigation } from "@react-navigation/native";
import React from "react";

import { ReturnButton } from "./ReturnButton";
import { Box, Text } from "../primitives";

type HeaderProps = {
  title?: string | null;
  goBack?: boolean;
  colorScheme?: "light" | "dark";
  onGoBack?: () => void;
};

export const Header = ({
  goBack = true,
  title,
  colorScheme = "dark",
  onGoBack,
}: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <Box flexDirection="row" alignItems="center" px="global_20" pt="global_24">
      <ReturnButton
        onPress={onGoBack || navigation.goBack}
        goBack={goBack}
        colorScheme={colorScheme}
      />

      {title && (
        <Box flexWrap="nowrap" pr="global_24">
          <Text
            variant="h3"
            color={colorScheme === "light" ? "PRIMARY_1" : "PRIMARY_12"}
            pl={goBack ? "global_15" : "zero"}
            numberOfLines={2}
          >
            {title}
          </Text>
        </Box>
      )}
    </Box>
  );
};
