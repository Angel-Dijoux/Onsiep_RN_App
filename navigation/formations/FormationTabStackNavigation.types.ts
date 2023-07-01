import { RouteProp } from "@react-navigation/native";

export type FormationTabStackNavigationParamsList = {
  FormationScreen: {
    id: string;
  };
  HomeScreen: undefined;
  SearchScreen: {
    query: string;
  };
};

export type FormationScreenRouteProps = {
  navigation: RouteProp<
    FormationTabStackNavigationParamsList,
    "FormationScreen"
  >;
};

export type SearchScreenRouteProps = {
  navigation: RouteProp<FormationTabStackNavigationParamsList, "SearchScreen">;
};
