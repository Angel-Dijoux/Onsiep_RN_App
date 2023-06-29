import { View } from "react-native";
import React from "react";
import { Box, Text } from "../shared/ui/primitives";

export const Home = () => {
  return (
    <Box flex={1} bg="WHITE" p="global_24">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          bg="ERROR"
          alignItems="center"
          justifyContent="center"
          borderRadius="round"
          pr="global_10"
        >
          <Text>w</Text>
        </Box>
        <Box bg="PRIMARY_DARK" borderRadius="global_16">
          <Text>Formation...</Text>
        </Box>
      </Box>
      <Box
        bg="SECONDARY_DARK"
        mt="global_15"
        p="global_15"
        borderRadius="global_8"
      >
        <Text variant="h3" color="BLACK">
          BTS Prothésiste dentaire
        </Text>
      </Box>
    </Box>
  );
};
