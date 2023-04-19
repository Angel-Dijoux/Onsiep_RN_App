import React from "react";
import { ActivityIndicator } from "react-native";

import { Box } from "./primitives";
import { colors } from "./primitives/theme/colors";

const Loading = () => {
  return (
    <Box justifyContent="center" alignItems="center" height="100%">
      <ActivityIndicator size="small" color={colors.GREY_65} />
    </Box>
  );
};

export { Loading };
