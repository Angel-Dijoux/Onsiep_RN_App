import { useNetInfo } from "@react-native-community/netinfo";
import React, { useContext, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, BackHandler } from "react-native";

import Header from "./../src/components/ui/header";
import GetContentAPI from "../src/components/api/get_content_api";
import NoResult from "../src/components/ui/no_result";
import { AuthContext } from "../src/context/AuthContext";
import { FavorisContext } from "../src/context/FavorisContext";
import { Screen } from "../shared/ui/navigation/Screen";
import { Loading } from "../shared/ui/Loading";
import { Box } from "../shared/ui/primitives";

const FavScreen = ({ navigation }) => {
  const { favisloading } = useContext(FavorisContext);
  const { favoris } = useContext(AuthContext);

  const handleBackButtonClick = () => {
    navigation.navigate("Home");
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  if (favisloading) return <Loading />;
  return (
    <Screen title="Favoris" isScrollable goBack>
      <Box>
        {favoris.size < 0 ? (
          <GetContentAPI
            data={favoris.results}
            icon={require("../src/icons/trah.png")}
            width="100%"
          />
        ) : (
          <Box alignItems="center" justifyContent="center" height="100%">
            <NoResult
              icon={require("../src/icons/noresult.png")}
              text="Aucun favoris"
            />
          </Box>
        )}
      </Box>
    </Screen>
  );
};

export default FavScreen;
