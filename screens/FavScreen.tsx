import React, { useEffect } from "react";
import { BackHandler } from "react-native";

import { Loading } from "../shared/ui/Loading";
import { Screen } from "../shared/ui/navigation/Screen";
import { Box } from "../shared/ui/primitives";
import { ListFormation } from "../src/components/Formation/ListFormation";
import { NoResult } from "../src/components/ui/no_result";
import { useFavoris } from "../src/hooks/favoris/useFavoris";

const FavScreen = ({ navigation }) => {
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
    <Screen title="Favoris" isScrollable goBack>
      <Box py="global_24">
        {favoris ? (
          <ListFormation
            data={favoris.results}
            isFavScreen
            navigation={navigation}
          />
        ) : (
          <NoResult text="Aucun favoris" />
        )}
      </Box>
    </Screen>
  );
};

export { FavScreen };
