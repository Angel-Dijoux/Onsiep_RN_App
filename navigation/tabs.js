import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeTabIcon, LoginTabIcon, SettingsTabIcon } from "./AuthTabs";
import { FavScreen } from "../screens/FavScreen";
import { Home } from "../screens/Home";
import SettingsScreem from "../screens/SettingsScreen";
import { colors } from "../shared/ui/primitives/theme/colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "relative",
          backgroundColor: colors.WHITE,
          height: 50,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Fav"
        component={FavScreen}
        options={{
          tabBarIcon: LoginTabIcon,
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreem}
        options={{
          tabBarIcon: SettingsTabIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export { Tabs };
