import React, { useContext, useEffect } from "react";
import { BackHandler, Dimensions } from "react-native";

import { Loading } from "../shared/ui/Loading";
import { Screen } from "../shared/ui/navigation/Screen";
import { Box } from "../shared/ui/primitives";
import { ListFormation } from "../src/components/Formation/ListFormation";
import { NoResult } from "../src/components/ui/no_result";
import { FavorisContext } from "../src/context/FavorisContext";
import { useFavoris } from "../src/hooks/favoris/useFavoris";

const FavScreen = ({ navigation }) => {
  const { favisloading, DeleteFavoris } = useContext(FavorisContext);
  // const { favoris } = useContext(AuthContext);

  const { isLoading, favoris } = useFavoris();

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

  if (isLoading) return <Loading />;
  return (
    <Screen title="Favoris" isScrollable goBack edges={["top"]}>
      <Box py="global_24">
        {favoris ? (
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
