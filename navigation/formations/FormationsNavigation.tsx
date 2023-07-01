import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../../screens/Home";
import { Formation } from "../../screens/Formation";
import { FormationTabStackNavigationParamsList } from "./FormationTabStackNavigation.types";
import { SearchScreen } from "../../screens/search/SearchScreen";

export const FormationsNavigation = () => {
  const Stack = createStackNavigator<FormationTabStackNavigationParamsList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="FormationScreen" component={Formation} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};
