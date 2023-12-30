import { NavigatorScreenParams } from "@react-navigation/native";

import { BottomAuthTabNavigatorParamsList } from "./authTabs.types";
import { BottomTabNavigatorParamsList } from "./tabs.types";

export type RootStackParamsList = {
  HomeScreen: NavigatorScreenParams<BottomTabNavigatorParamsList>;
  AuthScreen: NavigatorScreenParams<BottomAuthTabNavigatorParamsList>;
};
