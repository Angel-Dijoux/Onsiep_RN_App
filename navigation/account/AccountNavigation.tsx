import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { AccountTabStackNavigationParamsList } from "./AccountTabStackNavigation.types";
import { LoginScreen } from "../../screens/LoginScreen";
import { RegisterScreen } from "../../screens/RegisterScreen";

export const AccountNavigation = () => {
  const Stack = createStackNavigator<AccountTabStackNavigationParamsList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};
