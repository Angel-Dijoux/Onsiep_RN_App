import { ThemeProvider } from "@shopify/restyle";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import AppNav from "./navigation/AppNav";
import { QueryClientProvider, queryClient } from "./react-query.config";
import { theme } from "./shared/ui/primitives/theme/theme";
import DisplayMessages from "./src/components/ui/Notification/display_messages";
import { AuthProvider } from "./src/context/AuthContext";
import { FavorisProvider } from "./src/context/FavorisContext";
import { OnisepProvider } from "./src/context/OnisepContext";
import { getCurrentUserStorage } from "./src/components/utils/currentUserStorage";

import {
  CurrentUserContext,
  defaultCurrentUser,
} from "./src/hooks/user/useCurrentUser";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [currentUser, setCurrentUser] = useState(defaultCurrentUser);

  const [fontsLoaded] = useFonts({
    Satoshi: require("./assets/fonts/Satoshi.ttf"),
    Manrope: require("./assets/fonts/Manrope.ttf"),
  });
  useEffect(() => {
    const dimissSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };

    dimissSplashScreen();
  }, [fontsLoaded]);

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
      if (userData) {
        setCurrentUser(userData);
        console.log(userData.accessToken);
      }
    };
    setupData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <QueryClientProvider client={queryClient}>
          <OnisepProvider>
            <AuthProvider>
              <FavorisProvider>
                <ThemeProvider theme={theme}>
                  <DisplayMessages />
                  <CurrentUserContext.Provider value={currentUserValue}>
                    <AppNav />
                  </CurrentUserContext.Provider>
                </ThemeProvider>
              </FavorisProvider>
            </AuthProvider>
          </OnisepProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export { App };
