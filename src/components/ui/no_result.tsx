import React from "react";
import { Image, ImageSourcePropType } from "react-native";

import { Box, Text } from "../../../shared/ui/primitives";

const NoResult = ({
  icon,
  text,
}: {
  icon: ImageSourcePropType;
  text: string;
}) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Image
        source={icon}
        resizeMode="contain"
        style={{ width: 85, height: 85 }}
      />
      <Text color="BLACK" variant="xlarge">
        {text}
      </Text>
    </Box>
  );
};

export { NoResult };
