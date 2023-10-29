import React from "react";

import { type SearchScreenRouteProps } from "../../navigation/formations/FormationTabStackNavigation.types";
import { Loading } from "../../shared/ui/Loading";
import { Box } from "../../shared/ui/primitives";
import { useSearchFormations } from "../../src/hooks/formation/useSearchFormations";
import { ListFormationsDetails } from "../formations/ListFormationsDetails";
import { HeaderHomeScreen } from "../home/HeaderHomeScreen";

export const SearchScreen: React.FC<SearchScreenRouteProps> = ({ route }) => {
  const { query } = route.params;
  const { getSearchedFormations, isLoading, formations } =
    useSearchFormations(query);
  const { data, isLoading: loading } = getSearchedFormations;

  if (!isLoading) console.log(formations);

  if (loading) return <Loading />;
  return (
    <Box flex={1} px="global_24">
      <HeaderHomeScreen />
      <ListFormationsDetails data={data?.results} />
    </Box>
  );
};
