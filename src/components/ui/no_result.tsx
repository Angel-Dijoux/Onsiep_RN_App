import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

import { Box, Text } from "../../../shared/ui/primitives";
import { colors } from "../../../shared/ui/theme/colors";
import { spacing } from "../../../shared/ui/theme/spacing";

const NoResult = ({ text }: { text: string }) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <MaterialCommunityIcons
        name="space-invaders"
        size={spacing.global_40}
        color={colors.GREY_SEND_DARK}
      />
      <Text color="BLACK" fontFamily="manrope" variant="xlarge">
        {text}
      </Text>
    </Box>
  );
};

export { NoResult };
