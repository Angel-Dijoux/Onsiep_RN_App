import React from "react";
import { ActivityIndicator } from "react-native";

import { Box } from "./primitives";
import { colors } from "./theme/colors";

const Loading = () => {
  return (
    <Box justifyContent="center" alignItems="center" height="100%">
      <ActivityIndicator size="small" color={colors.PRIMARY_8} />
    </Box>
  );
};

export { Loading };
