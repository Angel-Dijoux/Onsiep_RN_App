import { NavigatorScreenParams } from "@react-navigation/native";

import { FormationTabStackNavigationParamsList } from "./formations/FormationTabStackNavigation.types";

export type BottomTabNavigatorParamsList = {
  Formations: NavigatorScreenParams<FormationTabStackNavigationParamsList>;
  FavScreen: undefined;
};
