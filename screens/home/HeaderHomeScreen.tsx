import React from "react";
import { Image } from "react-native";

import { Input } from "../../shared/ui/forms/Input";
import { Box } from "../../shared/ui/primitives";
import { borderRadii } from "../../shared/ui/primitives/theme/borderRadii";
import { spacing } from "../../shared/ui/primitives/theme/spacing";

export const HeaderHomeScreen = () => {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      py="global_15"
    >
      <Image
        source={{
          uri: "https://sm.ign.com/ign_br/screenshot/default/naruto-uzumaki-qabz_3vhp.png",
        }}
        style={{ height: 40, width: 40, paddingRight: spacing.global_10 }}
        borderRadius={borderRadii.round}
      />
      <Box
        bg="SECONDARY_DARK"
        justifyContent="center"
        height={32}
        width="85%"
        borderRadius="global_16"
        px="global_15"
      >
        <Input placeholder="Rechercher un formation..." />
      </Box>
    </Box>
  );
};
