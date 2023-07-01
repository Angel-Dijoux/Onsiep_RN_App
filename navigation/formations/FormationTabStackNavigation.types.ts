import { RouteProp } from "@react-navigation/native";

export type FormationTabStackNavigationParamsList = {
    FormationScreen: {
        id: string
    }
    HomeScreen: undefined
    SearchScreen: undefined
}

export type FormationScreenRouteProps = {
    navigation: RouteProp<FormationTabStackNavigationParamsList, "FormationScreen">;
};
