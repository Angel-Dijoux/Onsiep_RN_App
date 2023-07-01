import React from "react";
import { View, Text } from "react-native";

import { SearchScreenRouteProps } from "../../navigation/formations/FormationTabStackNavigation.types";

export const SearchScreen: React.FC<SearchScreenRouteProps> = ({
  navigation,
}) => {
  const { query } = navigation.params;
  return (
    <View>
      <Text>{query}</Text>
    </View>
  );
};
