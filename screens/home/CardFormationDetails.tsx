import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Pressable } from "react-native";

import { makeAppStyles } from "$shared/ui/primitives/theme/theme";
import { capitalizeFirstLetter } from "$utils/typoFormat";

import { AccountTabStackNavigationParamsList } from "../../navigation/account/AccountTabStackNavigation.types";
import { Formation } from "../../shared/formation/fomationv2.type";
import { Label } from "../../shared/ui/Label";
import { Box, Text } from "../../shared/ui/primitives";
import { colors } from "../../shared/ui/primitives/theme/colors";
import { useAddFavoris } from "../../src/hooks/favoris/useAddFavoris";
import { useCurrentUser } from "../../src/hooks/user/useCurrentUser";

export const CardFormationDetails = ({ item }: { item: Formation }) => {
  const navigation =
    useNavigation<StackNavigationProp<AccountTabStackNavigationParamsList>>();

  const { accessToken } = useCurrentUser();

  const { handleAddFavoris } = useAddFavoris();

  const handleFavoris = (item: Formation): void => {
    if (accessToken) {
      handleAddFavoris(item);
    } else {
      navigation.navigate("LoginScreen");
    }
  };

  const styles = useStyles();

  return (
    <Box bg="PRIMARY_2" mt="global_15" p="global_15" borderRadius="global_8">
      <Text variant="h3" color="PRIMARY_12">
        {capitalizeFirstLetter(item.libelle || "Formation")}
      </Text>
      <Box flexDirection="row" mt="global_5">
        <Label text={item.duree} />
        <Label text={item.niveau_de_sortie} />
      </Box>
      <Label text={item.tutelle} />

      <Pressable
        onPress={() => handleFavoris(item)}
        style={styles.iconContainer}
      >
        <AntDesign
          name="staro"
          size={24}
          color={colors.PRIMARY_1}
          style={styles.iconStyle}
        />
      </Pressable>
    </Box>
  );
};

const useStyles = makeAppStyles(({ colors, borderRadii, spacing }) => ({
  iconContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: spacing.global_20,
  },
  iconStyle: {
    backgroundColor: colors.PRIMARY_9,
    borderRadius: borderRadii.round,
    padding: spacing.global_8,
  },
}));
