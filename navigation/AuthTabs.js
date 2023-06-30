import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TabIconBar } from "./TabIconBar";
import { Home } from "../screens/Home";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import SettingsScreem from "../screens/SettingsScreen";
import { colors } from "../shared/ui/primitives/theme/colors";

const Tab = createBottomTabNavigator();

export const LoginTabIcon = ({ focused }) => (
  <TabIconBar focused={focused} icon="../src/icons/star.png" />
);

export const HomeTabIcon = ({ focused }) => (
  <TabIconBar focused={focused} icon="../src/icons/home.png" />
);

export const SettingsTabIcon = ({ focused }) => (
  <TabIconBar focused={focused} icon="../src/icons/home.png" />
);

const AuthTabs = () => {
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
        name="Login"
        component={LoginScreen}
        options={{
          tabBarIcon: LoginTabIcon,
        }}
      />
      <Tab.Screen name="register" component={RegisterScreen} />
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

export { AuthTabs };
