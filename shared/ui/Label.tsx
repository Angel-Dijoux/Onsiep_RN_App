import React from "react";

import { Box, Text } from "./primitives";
import { Colors } from "./primitives/theme/colors";

export const Label = ({
  text,
  bg,
  color,
}: {
  text?: string;
  bg: Colors;
  color?: Colors;
}) => {
  return (
    <Box
      bg={bg}
      justifyContent="center"
      px="global_10"
      py="global_2"
      mr="global_5"
      my="global_5"
      minHeight={24}
      borderRadius="global_16"
    >
      <Text
        color={color ?? "BLACK"}
        variant="small"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
    </Box>
  );
};
