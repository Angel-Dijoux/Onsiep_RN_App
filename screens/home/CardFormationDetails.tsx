import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Pressable } from "react-native";

import { makeAppStyles } from "$shared/ui/theme/theme";
import { capitalizeFirstLetter } from "$utils/typoFormat";

import { AccountTabStackNavigationParamsList } from "../../navigation/account/AccountTabStackNavigation.types";
import { FormationListItem } from "../../shared/formation/fomationv2.type";
import { Label } from "../../shared/ui/Label";
import { Box, Text } from "../../shared/ui/primitives";
import { colors } from "../../shared/ui/theme/colors";
import { useAddFavoris } from "../../src/hooks/favoris/useAddFavoris";
import { useRemoveFavori } from "../../src/hooks/favoris/useRemoveFavori";
import { useCurrentUser } from "../../src/hooks/user/useCurrentUser";

export const CardFormationDetails = ({ item }: { item: FormationListItem }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(item.is_favorite);

  const navigation =
    useNavigation<StackNavigationProp<AccountTabStackNavigationParamsList>>();

  const { accessToken } = useCurrentUser();

  const { handleAddFavoris } = useAddFavoris();
  const { handleRemoveFavori } = useRemoveFavori();

  const handleFavoris = (item: FormationListItem): void => {
    if (!accessToken) {
      navigation.navigate("LoginScreen");
      return;
    }

    if (isFavorite) {
      handleRemoveFavori(item.formation.id as string);
    } else {
      handleAddFavoris(item.formation);
    }
    setIsFavorite((prev) => !prev);
  };

  const styles = useStyles();

  return (
    <Box bg="PRIMARY_2" mt="global_15" p="global_15" borderRadius="global_8">
      <Text variant="h3" color="PRIMARY_12">
        {capitalizeFirstLetter(item.formation.libelle || "Formation")}
      </Text>
      <Box flexDirection="row" mt="global_5">
        <Label text={item.formation.duree} />
        <Label text={item.formation.niveau_de_sortie} />
      </Box>
      <Label text={item.formation.tutelle} />

      <Pressable
        onPress={() => handleFavoris(item)}
        style={styles.iconContainer}
      >
        <AntDesign
          name={isFavorite ? "star" : "staro"}
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
