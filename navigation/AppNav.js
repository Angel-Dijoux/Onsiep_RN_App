import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";

import { AuthTabs } from "./AuthTabs";
import { Tabs } from "./tabs";
import { Loading } from "../shared/ui/Loading";
import { useCurrentUser } from "../src/hooks/user/useCurrentUser";
import { colors } from "../shared/ui/primitives/theme/colors";

const AppNav = () => {
  const { accessToken } = useCurrentUser();

  return (
    <NavigationContainer theme={navigationTheme} fallback={<Loading />}>
      {accessToken ? <Tabs /> : <AuthTabs />}
    </NavigationContainer>
  );
};

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.WHITE,
  },
};

export { AppNav };
