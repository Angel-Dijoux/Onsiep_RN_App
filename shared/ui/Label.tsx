import React from "react";

import { Box, Text } from "./primitives";

export const Label = ({ text }: { text?: string }) => {
  return (
    <Box
      bg="PRIMARY_4"
      justifyContent="center"
      padding="global_8"
      my="global_5"
      mx="global_5"
      minHeight={41}
      borderRadius="global_8"
      borderWidth={1}
      borderColor="PRIMARY_9"
    >
      <Text
        color="PRIMARY_9"
        variant="regular"
        fontWeight="800"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
    </Box>
  );
};
