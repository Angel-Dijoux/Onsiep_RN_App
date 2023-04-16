import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";

import AuthTabs from "./AuthTabs";
import Tabs from "./tabs";
import { AuthContext } from "../src/context/AuthContext";

const AppNav = () => {
  const { isloading, userToken } = useContext(AuthContext);

  if (isloading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <Tabs /> : <AuthTabs />}
    </NavigationContainer>
  );
};

export default AppNav;
