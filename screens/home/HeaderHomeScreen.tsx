import React, { useCallback, useState } from "react";
import { Image } from "react-native";

import { Input } from "../../shared/ui/forms/Input";
import { Box } from "../../shared/ui/primitives";
import { borderRadii } from "../../shared/ui/primitives/theme/borderRadii";
import { spacing } from "../../shared/ui/primitives/theme/spacing";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FormationTabStackNavigationParamsList } from "../../navigation/formations/FormationTabStackNavigation.types";

export const HeaderHomeScreen = () => {
  const [query, setQuery] = useState<string>("");
  const navigation =
    useNavigation<
      StackNavigationProp<FormationTabStackNavigationParamsList, "HomeScreen">
    >();

  const handleSearchQuery = () => {
    navigation.navigate("SearchScreen", { query });
  };

  const handleInputChange = useCallback((text: string) => {
    setQuery(text);
  }, []);

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
        <Input
          placeholder="Rechercher un formation..."
          onChangeText={(text: string) => handleInputChange(text)}
          onSubmitEditing={handleSearchQuery}
        />
      </Box>
    </Box>
  );
};
