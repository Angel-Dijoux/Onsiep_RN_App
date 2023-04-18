import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import AppNav from "./navigation/AppNav";
import { AuthProvider } from "./src/context/AuthContext";
import { FavorisProvider } from "./src/context/FavorisContext";
import { OnisepProvider } from "./src/context/OnisepContext";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "./shared/ui/primitives/theme/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import DisplayMessages from "./src/components/ui/Notification/display_messages";

SplashScreen.preventAutoHideAsync();

const App = () => {
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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <OnisepProvider>
          <AuthProvider>
            <FavorisProvider>
              <ThemeProvider theme={theme}>
                <DisplayMessages />
                <AppNav />
              </ThemeProvider>
            </FavorisProvider>
          </AuthProvider>
        </OnisepProvider>
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
