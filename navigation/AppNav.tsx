import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DefaultTheme,
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";

import { CurrentUserType } from "$shared/auth/currentUser.types";

import { AuthTabs } from "./AuthTabs";
import { Tabs } from "./Tabs";
import { RootStackParamsList } from "./rootStack.types";
import { Loading } from "../shared/ui/Loading";
import { colors } from "../shared/ui/theme/colors";
import { getCurrentUserStorage } from "../src/components/utils/currentUserStorage";
import {
  CurrentUserContext,
  defaultCurrentUser,
} from "../src/hooks/user/useCurrentUser";

const AppNav = () => {
  const [currentUser, setCurrentUser] =
    useState<CurrentUserType>(defaultCurrentUser);
  const [isFetchFromSecureStoreDone, setIsFetchFromSecureStoreDone] =
    useState(false);

  const isUserLoggedIn = currentUser.accessToken.length > 0;

  const routeNameRef = useRef<string>();
  const navigationRef = useNavigationContainerRef();

  const RootStack = createNativeStackNavigator<RootStackParamsList>();

  const onNavigationReady = () => {
    routeNameRef.current = navigationRef.getCurrentRoute()?.name;
  };

  const currentUserValue = useMemo(
    () => ({
      ...currentUser,
      setCurrentUser,
    }),
    [currentUser]
  );

  useEffect(() => {
    const setupData = async () => {
      const userData = await getCurrentUserStorage();
      if (userData.accessToken) {
        setCurrentUser(userData);
      }

      setIsFetchFromSecureStoreDone(true);
    };
    setupData();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUserValue}>
      {isFetchFromSecureStoreDone && (
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
      )}
    </CurrentUserContext.Provider>
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
