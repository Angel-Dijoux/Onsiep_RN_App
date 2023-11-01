import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeTabIcon, screenOptions, tabBarStyle } from "./AuthTabs";
import { FormationsNavigation } from "./formations/FormationsNavigation";
import { TAB_BAR_ICON_SIZE, type TabBarIconProps } from "./icon.types";
import { BottomTabNavigatorParamsList } from "./tabs.types";
import { FavScreen } from "../screens/FavScreen";
import { colors } from "../shared/ui/primitives/theme/colors";

const Tab = createBottomTabNavigator<BottomTabNavigatorParamsList>();

export const FavTabIcon = ({ focused }: TabBarIconProps) => (
  <AntDesign
    name="staro"
    size={TAB_BAR_ICON_SIZE}
    color={focused ? colors.PRIMARY_11 : colors.PRIMARY_6}
  />
);

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        ...screenOptions,
        tabBarShowLabel: false,
        tabBarStyle,
      }}
    >
      <Tab.Screen
        name="FavScreen"
        component={FavScreen}
        options={{
          tabBarIcon: FavTabIcon,
        }}
      />
      <Tab.Screen
        name="Formations"
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

export { Tabs };
