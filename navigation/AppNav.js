import React, { useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Tabs from './tabs';
import { AuthContext } from '../src/context/AuthContext';
import AuthTabs from './AuthTabs';

const AppNav = () => {
    const {isloading, userToken} = useContext(AuthContext)

    if(isloading) {
        return (
        <View style={{flex: 1, justifyContent: 'center', alignItems:"center"}}>
            <ActivityIndicator size={"large"}/>
        </View>)
    }

    return (
        <NavigationContainer>
            { userToken !== null ?  <Tabs /> : <AuthTabs />}
        </NavigationContainer>
    )
}

export default AppNav