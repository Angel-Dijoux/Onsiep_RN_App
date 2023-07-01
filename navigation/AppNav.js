import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";

import { AuthTabs } from "./AuthTabs";
import { Tabs } from "./tabs";
import { Loading } from "../shared/ui/Loading";
import { AuthContext } from "../src/context/AuthContext";
import { useCurrentUser } from "../src/hooks/user/useCurrentUser";

const AppNav = () => {
  const { isloading } = useContext(AuthContext);
  const { accessToken } = useCurrentUser();

  if (isloading) return <Loading />;

  return (
    <NavigationContainer>
      {accessToken ? <Tabs /> : <AuthTabs />}
    </NavigationContainer>
  );
};

export { AppNav };
