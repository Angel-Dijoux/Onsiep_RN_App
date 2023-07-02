import React from "react";

import { Loading } from "../shared/ui/Loading";
import { Screen } from "../shared/ui/navigation/Screen";
import { Box } from "../shared/ui/primitives";
import { ListFormation } from "../src/components/Formation/ListFormation";
import { useFavoris } from "../src/hooks/favoris/useFavoris";

const FavScreen = () => {
  const { isLoading, favoris } = useFavoris();

  if (isLoading) return <Loading />;
  return (
    <Screen title="Favoris" isScrollable goBack={false}>
      <Box py="global_24">
        <ListFormation data={favoris?.results} isFavScreen />
      </Box>
    </Screen>
  );
};

export { FavScreen };
