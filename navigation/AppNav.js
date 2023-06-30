import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";

import { AuthTabs } from "./AuthTabs";
import Tabs from "./tabs";
import { AuthContext } from "../src/context/AuthContext";
import { useCurrentUser } from "../src/hooks/user/useCurrentUser";

const AppNav = () => {
  const { isloading, userToken } = useContext(AuthContext);
  const { accessToken } = useCurrentUser();

  if (isloading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {accessToken ? <Tabs /> : <AuthTabs />}
    </NavigationContainer>
  );
};

export default AppNav;
