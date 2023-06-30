import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import { Formation } from "../screens/Formation";
import { Home } from "../screens/Home";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import SettingsScreem from "../screens/SettingsScreen";

const Stack = createStackNavigator();

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

  const StackAuth = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={horizontalAnimation}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={horizontalAnimation}
      />
      <Stack.Screen
        name="register"
        component={RegisterScreen}
        options={horizontalAnimation}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreem}
        options={horizontalAnimation}
      />
      <Stack.Screen
        name="Formation"
        component={Formation}
        options={horizontalAnimation}
      />
    </Stack.Navigator>
  );

  return StackAuth;

  // For debug
  /*  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#F2F4FB",
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
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: focused ? 0 : 3,
              }}
            >
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
              <Text
                style={{ color: focused ? "#C52E25" : "#030402", fontSize: 10 }}
              >
                Login
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen name="register" component={RegisterScreen} />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
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
              <Text
                style={{ color: focused ? "#C52E25" : "#030402", fontSize: 10 }}
              >
                Accueil
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreem}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
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
              <Text
                style={{ color: focused ? "#C52E25" : "#030402", fontSize: 10 }}
              >
                Paramètres
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  ); */
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      heigh: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.5,
    elevation: 5,
  },
});

export default AuthTabs;
