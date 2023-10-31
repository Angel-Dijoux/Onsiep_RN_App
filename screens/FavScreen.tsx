import React from "react";

import { Loading } from "../shared/ui/Loading";
import { Screen } from "../shared/ui/navigation/Screen";
import { Box } from "../shared/ui/primitives";
import { useFavoris } from "../src/hooks/favoris/useFavoris";
import { ListFormationsDetails } from "./formations/ListFormationsDetails";

const FavScreen = () => {
  const { isLoading, favoris } = useFavoris();

  const handleEndReached = () => {
    console.log("END");
  };

  if (isLoading) return <Loading />;
  return (
    <Screen title="Favoris" isScrollable goBack={false}>
      <Box py="global_24">
        <ListFormationsDetails
          data={favoris?.results}
          handleEndReached={handleEndReached}
        />
      </Box>
    </Screen>
  );
};

export { FavScreen };
