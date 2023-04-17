import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import AppNav from "./navigation/AppNav";
import { AuthProvider } from "./src/context/AuthContext";
import { FavorisProvider } from "./src/context/FavorisContext";
import { OnisepProvider } from "./src/context/OnisepContext";

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
    <OnisepProvider>
      <AuthProvider>
        <FavorisProvider>
          <AppNav />
        </FavorisProvider>
      </AuthProvider>
    </OnisepProvider>
  );
};

export { App };
