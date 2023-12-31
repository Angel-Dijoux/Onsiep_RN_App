import React from "react";
import { TouchableOpacity } from "react-native";

import { Box, Text } from "../../../shared/ui/primitives";

const BtnTextConn = ({
  onPress,
  firstText,
  secondText,
}: {
  onPress: () => void;
  firstText: string;
  secondText: string;
}) => {
  return (
    <Box flexDirection="row" justifyContent="center" mt="global_5">
      <Text ml="global_15" color="GREY_SAND">
        {firstText}{" "}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Text color="PRIMARY_12" fontWeight="700">
          {secondText}
        </Text>
      </TouchableOpacity>
    </Box>
  );
};

export { BtnTextConn };
