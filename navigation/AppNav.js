import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";

import { AuthTabs } from "./AuthTabs";
import { Tabs } from "./tabs";
import { Loading } from "../shared/ui/Loading";
import { colors } from "../shared/ui/primitives/theme/colors";
import { useCurrentUser } from "../src/hooks/user/useCurrentUser";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const AppNav = () => {
  const { accessToken } = useCurrentUser();

  return (
    <NavigationContainer theme={navigationTheme} fallback={<Loading />}>
      <BottomSheetModalProvider>
        {accessToken ? <Tabs /> : <AuthTabs />}
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.BLACK,
  },
};

export { AppNav };
