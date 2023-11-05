import React from "react";

import { ListFormationsDetails } from "./formations/ListFormationsDetails";
import { HeaderHomeScreen } from "./home/HeaderHomeScreen";
import { Loading } from "../shared/ui/Loading";
import { Box } from "../shared/ui/primitives";
import { useGetOnisepFormations } from "../src/hooks/formation/useGetOnisepFormations";

export const Home = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } =
    useGetOnisepFormations();

  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) return <Loading />;
  return (
    <Box flex={1} px="global_24">
      <HeaderHomeScreen />
      <ListFormationsDetails
        data={data?.pages.flatMap((page) => page.formations)}
        handleEndReached={handleEndReached}
      />
    </Box>
  );
};
