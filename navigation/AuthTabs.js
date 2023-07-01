import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AccountNavigation } from "./account/AccountNavigation";
import { Home } from "../screens/Home";
import SettingsScreem from "../screens/SettingsScreen";
import { colors } from "../shared/ui/primitives/theme/colors";

const Tab = createBottomTabNavigator();

export const LoginTabIcon = ({ color }) => (
  <Ionicons name="log-in-outline" size={24} color={color} />
);

export const HomeTabIcon = ({ color }) => (
  <Ionicons name="ios-home-outline" size={24} color={color} />
);

export const SettingsTabIcon = ({ color }) => (
  <Ionicons name="settings-outline" size={24} color={color} />
);

export const RegiserTabIcon = ({ color }) => (
  <Ionicons name="person-add-outline" size={24} color={color} />
);

export const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: colors.PRIMARY_DARK,
  tabBarHideOnKeyboard: true,
};

const AuthTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        ...screenOptions,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.GREY_DARK,
          height: 50,
          borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Login"
        component={AccountNavigation}
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
      {/* <Tab.Screen
        name="Settings"
        component={SettingsScreem}
        options={{
          tabBarIcon: SettingsTabIcon,
        }}
      /> */}
    </Tab.Navigator>
  );
};

export { AuthTabs };
