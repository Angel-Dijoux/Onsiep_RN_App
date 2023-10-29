import React from "react";

import { Box, Text } from "./primitives";
import { Colors } from "./primitives/theme/colors";

export const Label = ({
  text,
  bg,
  color,
}: {
  text?: string;
  bg?: Colors;
  color?: Colors;
}) => {
  return (
    <Box
      bg="PRIMARY_6"
      justifyContent="center"
      px="global_10"
      py="global_2"
      mr="global_5"
      my="global_5"
      minHeight={41}
      borderRadius="global_8"
      borderWidth={1}
      borderColor="PRIMARY_9"
    >
      <Text
        color="PRIMARY_9"
        variant="small"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
    </Box>
  );
};
