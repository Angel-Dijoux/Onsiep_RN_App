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

import Toast from "react-native-toast-message";
import { AppNav } from "./navigation/AppNav";
import { QueryClientProvider, queryClient } from "./react-query.config";
import { colors } from "./shared/ui/primitives/theme/colors";
import { theme } from "./shared/ui/primitives/theme/theme";
import { getCurrentUserStorage } from "./src/components/utils/currentUserStorage";
import { AuthProvider } from "./src/context/AuthContext";
import { FavorisProvider } from "./src/context/FavorisContext";
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
          <CurrentUserContext.Provider value={currentUserValue}>
            <AuthProvider>
              <FavorisProvider>
                <ThemeProvider theme={theme}>
                  <AppNav />
                  <Toast />
                </ThemeProvider>
              </FavorisProvider>
            </AuthProvider>
          </CurrentUserContext.Provider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export { App };
