import React from "react";
import { Pressable } from "react-native";

import { Box, Text } from "../../../shared/ui/primitives";
import { colors } from "../../../shared/ui/primitives/theme/colors";

import { Ionicons, AntDesign } from "@expo/vector-icons";
import { spacing } from "../../../shared/ui/primitives/theme/spacing";

type CardFormationType = {
  type: string;
  duree: string;
  libelle: string;
  desc: string;
  onPress?: () => void;
  isFavcreen?: boolean;
};

const transformText = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);

const CardFormation = ({
  type,
  duree,
  libelle,
  desc,
  onPress,
  isFavcreen,
}: CardFormationType) => {
  return (
    <Box
      flexDirection="column"
      alignItems="flex-start"
      backgroundColor="SECONDARY_DARK"
      padding="global_15"
      borderRadius="global_8"
      my="global_5"
    >
      <Box
        width="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text
          fontSize={16}
          fontWeight="bold"
          color="GREY_90"
          fontFamily="satoshi"
        >
          {transformText(type) || "Non Renseigné"}
        </Text>
        <Pressable onPress={onPress}>
          {isFavcreen ? (
            <Ionicons
              name="ios-remove-circle-outline"
              size={spacing.global_24}
              color={colors.GREY_90}
            />
          ) : (
            <AntDesign
              name="staro"
              size={spacing.global_24}
              color={colors.GREY_90}
            />
          )}
        </Pressable>
      </Box>
      <Text
        mb="global_10"
        fontWeight="300"
        fontStyle="italic"
        fontSize={14}
        fontFamily="manrope"
        color="PRIMARY_80"
      >
        {duree}
      </Text>
      <Text color="GREY_DARK" mb="global_10" fontSize={16}>
        {transformText(libelle)}
      </Text>
      <Text
        color="GREY_DARK"
        mb="global_10"
        fontWeight="700"
        fontSize={15}
        selectable
      >
        {transformText(desc)}
      </Text>
    </Box>
  );
};

export { CardFormation };
