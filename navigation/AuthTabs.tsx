import { Ionicons } from "@expo/vector-icons";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Suspense } from "react";

import { Loading } from "$shared/ui/Loading";

import { AccountNavigation } from "./account/AccountNavigation";
import { BottomAuthTabNavigatorParamsList } from "./authTabs.types";
import { FormationsNavigation } from "./formations/FormationsNavigation";
import { TAB_BAR_ICON_SIZE, TabBarIconProps } from "./icon.types";
import { colors } from "../shared/ui/theme/colors";

const Tab = createBottomTabNavigator<BottomAuthTabNavigatorParamsList>();

export const LoginTabIcon = ({ focused }: TabBarIconProps) => (
  <Ionicons
    name="log-in-outline"
    size={TAB_BAR_ICON_SIZE}
    color={focused ? colors.PRIMARY_11 : colors.PRIMARY_6}
  />
);

export const HomeTabIcon = ({ focused }: TabBarIconProps) => (
  <Ionicons
    name="ios-home-outline"
    size={TAB_BAR_ICON_SIZE}
    color={focused ? colors.PRIMARY_11 : colors.PRIMARY_6}
  />
);

export const SettingsTabIcon = ({ focused }: TabBarIconProps) => (
  <Ionicons
    name="settings-outline"
    size={TAB_BAR_ICON_SIZE}
    color={focused ? colors.PRIMARY_11 : colors.PRIMARY_6}
  />
);

export const RegiserTabIcon = ({ focused }: TabBarIconProps) => (
  <Ionicons
    name="person-add-outline"
    size={TAB_BAR_ICON_SIZE}
    color={focused ? colors.PRIMARY_11 : colors.PRIMARY_6}
  />
);

export const screenOptions: BottomTabNavigationOptions = {
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
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
};

export { AuthTabs };
