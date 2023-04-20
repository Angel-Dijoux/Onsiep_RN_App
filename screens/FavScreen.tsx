import React, { useContext, useEffect } from "react";
import { BackHandler } from "react-native";

import { Loading } from "../shared/ui/Loading";
import { Screen } from "../shared/ui/navigation/Screen";
import { Box } from "../shared/ui/primitives";
import { ListFormation } from "../src/components/Formation/ListFormation";
import { NoResult } from "../src/components/ui/no_result";
import { AuthContext } from "../src/context/AuthContext";
import { FavorisContext } from "../src/context/FavorisContext";

const FavScreen = ({ navigation }) => {
  const { favisloading, DeleteFavoris } = useContext(FavorisContext);
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
          <ListFormation data={favoris.results} isFavScreen />
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
