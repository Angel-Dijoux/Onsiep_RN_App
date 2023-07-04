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
  route: RouteProp<
    FormationTabStackNavigationParamsList,
    "FormationScreen"
  >;
};

export type SearchScreenRouteProps = {
  route: RouteProp<FormationTabStackNavigationParamsList, "SearchScreen">;
};
