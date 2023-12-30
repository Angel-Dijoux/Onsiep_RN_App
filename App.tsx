import { ThemeProvider } from "@shopify/restyle";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { enableFreeze } from "react-native-screens";
import Toast from "react-native-toast-message";

import { AppNav } from "./navigation/AppNav";
import { QueryClientProvider, queryClient } from "./react-query.config";
import { colors } from "./shared/ui/theme/colors";
import { theme } from "./shared/ui/theme/theme";
import { toasterConfig } from "./src/components/ui/Notification/config";

enableFreeze(true);

const App = () => {
  const [fontsLoaded] = useFonts({
    Satoshi: require("./assets/fonts/Satoshi.ttf"),
    Manrope: require("./assets/fonts/Manrope.ttf"),
  });
  useEffect(() => {
    const dimissSplashScreen = async () => {
      await SplashScreen.preventAutoHideAsync();

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
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <AppNav />
            <Toast config={toasterConfig} />
          </ThemeProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.BLACK,
  },
});

export { App };
