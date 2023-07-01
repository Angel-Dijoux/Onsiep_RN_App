import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  HomeTabIcon,
  LoginTabIcon,
  SettingsTabIcon,
  screenOptions,
} from "./AuthTabs";
import { FavScreen } from "../screens/FavScreen";
import { Home } from "../screens/Home";
import SettingsScreem from "../screens/SettingsScreen";
import { colors } from "../shared/ui/primitives/theme/colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        ...screenOptions,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.WHITE,
          height: 50,
          borderTopColor: "transparent",
        },
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
