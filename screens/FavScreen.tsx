import React, { useContext, useEffect } from "react";
import { BackHandler } from "react-native";

import { Loading } from "../shared/ui/Loading";
import { Screen } from "../shared/ui/navigation/Screen";
import { Box } from "../shared/ui/primitives";
import GetContentAPI from "../src/components/api/get_content_api";
import { NoResult } from "../src/components/ui/no_result";
import { AuthContext } from "../src/context/AuthContext";
import { FavorisContext } from "../src/context/FavorisContext";

const FavScreen = ({ navigation }) => {
  const { favisloading } = useContext(FavorisContext);
  const { favoris } = useContext(AuthContext);

  const handleBackButtonClick = (): boolean => {
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
    <Screen title="Favoris" isScrollable goBack edges={["top"]}>
      <Box py="global_24">
        {favoris.size > 0 ? (
          <GetContentAPI
            data={favoris.results}
            icon={require("../src/icons/trah.png")}
            width="100%"
          />
        ) : (
          <NoResult
            icon={require("../src/icons/noresult.png")}
            text="Aucun favoris"
          />
        )}
      </Box>
    </Screen>
  );
};

export { FavScreen };
