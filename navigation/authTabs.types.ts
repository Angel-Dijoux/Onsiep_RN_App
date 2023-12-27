import { NavigatorScreenParams } from "@react-navigation/native";

import { AccountTabStackNavigationParamsList } from "./account/AccountTabStackNavigation.types";
import { FormationTabStackNavigationParamsList } from "./formations/FormationTabStackNavigation.types";


export type BottomAuthTabNavigatorParamsList = {
  Login: NavigatorScreenParams<AccountTabStackNavigationParamsList>;
  Home: NavigatorScreenParams<FormationTabStackNavigationParamsList>;
};

