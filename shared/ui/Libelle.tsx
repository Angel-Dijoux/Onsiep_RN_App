import React from "react";

import { Box, Text } from "./primitives";

const Libelle = ({ text }: { text: string }) => {
  return (
    <Box
      bg="GREY_SEND_DARK"
      borderRadius="global_8"
      padding="global_15"
      mx="global_2"
    >
      <Text
        color="PRIMARY_2"
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
