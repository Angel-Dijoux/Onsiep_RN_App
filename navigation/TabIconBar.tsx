import React from "react";
import { Image } from "react-native";

import { Box } from "../shared/ui/primitives";
import { colors } from "../shared/ui/primitives/theme/colors";
import { spacing } from "../shared/ui/primitives/theme/spacing";

export const TabIconBar = ({
  focused,
  icon,
}: {
  focused: boolean;
  icon: string;
}) => (
  <Box alignItems="center" justifyContent="center">
    <Image
      source={require(icon)}
      resizeMode="contain"
      style={{
        width: 25,
        height: 25,
        marginBottom: spacing.global_5,
        tintColor: focused ? colors.PRIMARY_DARK : colors.BLACK,
      }}
    />
  </Box>
);
