import React from "react";

import { Box, Text } from "./primitives";

const Libelle = ({ text }: { text: string }) => {
  return (
    <Box bg="GREY_90" borderRadius="global_8" padding="global_15" mx="global_2">
      <Text
        color="SECONDARY_BASE"
        fontWeight="700"
        fontFamily="satoshi"
        fontSize={14}
      >
        {text}
      </Text>
    </Box>
  );
};

export { Libelle };
