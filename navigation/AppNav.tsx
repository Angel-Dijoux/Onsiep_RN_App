import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import React, { Suspense, useRef } from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

import { AuthTabs } from "./AuthTabs";
import { Tabs } from "./Tabs";
import { Loading } from "../shared/ui/Loading";
import { colors } from "../shared/ui/primitives/theme/colors";
import { useCurrentUser } from "../src/hooks/user/useCurrentUser";
import { RootStackParamsList } from "./rootStack.types";

const AppNav = () => {
  const { accessToken } = useCurrentUser();
  const isUserLoggedIn = accessToken.length > 0;

  const routeNameRef = useRef<string>();
  const navigationRef = useNavigationContainerRef();

  const RootStack = createNativeStackNavigator<RootStackParamsList>();

  const onNavigationReady = () => {
    routeNameRef.current = navigationRef.getCurrentRoute()?.name;
  };

  return (
    <NavigationContainer
      theme={navigationTheme}
      fallback={<Loading />}
      ref={navigationRef}
      onReady={onNavigationReady}
    >
      <BottomSheetModalProvider>
        <Suspense fallback={<Loading />}>
          <RootStack.Navigator screenOptions={screenOptions}>
            {isUserLoggedIn ? (
              <RootStack.Screen name="HomeScreen" component={Tabs} />
            ) : (
              <RootStack.Screen name="AuthScreen" component={AuthTabs} />
            )}
          </RootStack.Navigator>
        </Suspense>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
};

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.BLACK,
  },
};

export { AppNav };
