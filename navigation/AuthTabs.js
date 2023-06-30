import { createStackNavigator } from "@react-navigation/stack";
import { Image, View } from "react-native";

import { Home } from "../screens/Home";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import SettingsScreem from "../screens/SettingsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../shared/ui/primitives/theme/colors";
import { Box } from "../shared/ui/primitives";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthTabs = () => {
  const horizontalAnimation = {
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 1],
              }),
            },
          ],
        },
      };
    },
  };

  // const StackAuth = (
  //   <Stack.Navigator
  //     screenOptions={{
  //       headerShown: false,
  //     }}
  //   >
  //     <Stack.Screen
  //       name="Home"
  //       component={Home}
  //       options={horizontalAnimation}
  //     />
  //     <Stack.Screen
  //       name="Login"
  //       component={LoginScreen}
  //       options={horizontalAnimation}
  //     />
  //     <Stack.Screen
  //       name="register"
  //       component={RegisterScreen}
  //       options={horizontalAnimation}
  //     />
  //     <Stack.Screen
  //       name="Settings"
  //       component={SettingsScreem}
  //       options={horizontalAnimation}
  //     />
  //     <Stack.Screen
  //       name="Formation"
  //       component={Formation}
  //       options={horizontalAnimation}
  //     />
  //   </Stack.Navigator>
  // );

  // return StackAuth;

  // For debug
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
          tabBarIcon: ({ focused }) => (
            <Box alignItems="center" justifyContent="center">
              <Image
                source={require("../src/icons/star.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  marginBottom: 2,
                  tintColor: focused ? "#C52E25" : "#030402",
                }}
              />
            </Box>
          ),
        }}
      />
      <Tab.Screen name="register" component={RegisterScreen} />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Box
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: focused ? 0 : 3,
              }}
            >
              <Image
                source={require("../src/icons/home.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  marginBottom: 2,
                  tintColor: focused ? "#C52E25" : "#030402",
                }}
              />
            </Box>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreem}
        options={{
          tabBarIcon: ({ focused }) => (
            <Box
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: focused ? 0 : 3,
              }}
            >
              <Image
                source={require("../src/icons/settings.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  marginBottom: 2,
                  tintColor: focused ? "#C52E25" : "#030402",
                }}
              />
            </Box>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export { AuthTabs };
