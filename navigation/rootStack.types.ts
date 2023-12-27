import { NavigatorScreenParams } from "@react-navigation/native"
import { BottomTabNavigatorParamsList } from "./tabs.types"
import { BottomAuthTabNavigatorParamsList } from "./authTabs.types"

export type RootStackParamsList = {
    HomeScreen: NavigatorScreenParams<BottomTabNavigatorParamsList>
    AuthScreen: NavigatorScreenParams<BottomAuthTabNavigatorParamsList>
}