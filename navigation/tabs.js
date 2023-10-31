import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeTabIcon, screenOptions, tabBarStyle } from "./AuthTabs";
import { FormationsNavigation } from "./formations/FormationsNavigation";
import { FavScreen } from "../screens/FavScreen";
import { colors } from "../shared/ui/primitives/theme/colors";

const Tab = createBottomTabNavigator();

export const FavTabIcon = ({ focused }) => (
  <AntDesign
    name="staro"
    size={24}
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
        name="Fav"
        component={FavScreen}
        options={{
          tabBarIcon: FavTabIcon,
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

export { Tabs };
