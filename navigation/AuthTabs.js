import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AccountNavigation } from "./account/AccountNavigation";
import { FormationsNavigation } from "./formations/FormationsNavigation";
import { colors } from "../shared/ui/primitives/theme/colors";

const Tab = createBottomTabNavigator();

export const LoginTabIcon = ({ focused }) => (
  <Ionicons
    name="log-in-outline"
    size={24}
    color={focused ? colors.PRIMARY_11 : colors.PRIMARY_6}
  />
);

export const HomeTabIcon = ({ focused }) => (
  <Ionicons
    name="ios-home-outline"
    size={24}
    color={focused ? colors.PRIMARY_11 : colors.PRIMARY_6}
  />
);

export const SettingsTabIcon = ({ focused }) => (
  <Ionicons
    name="settings-outline"
    size={24}
    color={focused ? colors.PRIMARY_11 : colors.PRIMARY_6}
  />
);

export const RegiserTabIcon = ({ focused }) => (
  <Ionicons
    name="person-add-outline"
    size={24}
    color={focused ? colors.PRIMARY_11 : colors.PRIMARY_6}
  />
);

export const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
  tabBarActiveTintColor: colors.PRIMARY_1,
  tabBarHideOnKeyboard: true,
};

export const tabBarStyle = {
  backgroundColor: colors.BLACK,
  height: 50,
  borderTopColor: colors.PRIMARY_12,
};

const AuthTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        ...screenOptions,
        tabBarShowLabel: false,
        tabBarStyle,
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
        component={FormationsNavigation}
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
