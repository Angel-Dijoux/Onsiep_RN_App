import React, { useEffect } from "react";

import { type SearchScreenRouteProps } from "../../navigation/formations/FormationTabStackNavigation.types";
import { Loading } from "../../shared/ui/Loading";
import { Box } from "../../shared/ui/primitives";
import { useSearchFormations } from "../../src/hooks/formation/useSearchFormations";
import { ListFormationsDetails } from "../formations/ListFormationsDetails";
import { HeaderHomeScreen } from "../home/HeaderHomeScreen";

export const SearchScreen: React.FC<SearchScreenRouteProps> = ({ route }) => {
  const { query } = route.params;
  const { data, fetchNextPage, hasNextPage, refetch, isLoading } =
    useSearchFormations(query);

  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  if (isLoading) return <Loading />;
  return (
    <Box flex={1} px="global_24">
      <HeaderHomeScreen prevQuery={query} />
      <ListFormationsDetails
        data={data?.pages.flatMap((page) => page.formations)}
        handleEndReached={handleEndReached}
      />
    </Box>
  );
};
