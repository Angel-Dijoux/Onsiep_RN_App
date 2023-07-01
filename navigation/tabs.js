import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeTabIcon, screenOptions } from "./AuthTabs";
import { FavScreen } from "../screens/FavScreen";
import { Home } from "../screens/Home";
import { colors } from "../shared/ui/primitives/theme/colors";

const Tab = createBottomTabNavigator();

export const FavTabIcon = ({ color }) => (
  <AntDesign name="staro" size={24} color={color} />
);

const Tabs = () => {
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
        name="Fav"
        component={FavScreen}
        options={{
          tabBarIcon: FavTabIcon,
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

export { Tabs };
