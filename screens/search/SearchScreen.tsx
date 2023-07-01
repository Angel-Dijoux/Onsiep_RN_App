import React from "react";

import { type SearchScreenRouteProps } from "../../navigation/formations/FormationTabStackNavigation.types";
import { Loading } from "../../shared/ui/Loading";
import { Box } from "../../shared/ui/primitives";
import { useSearchFormations } from "../../src/hooks/formation/useSearchFormations";
import { ListFormationsDetails } from "../formations/ListFormationsDetails";
import { HeaderHomeScreen } from "../home/HeaderHomeScreen";

export const SearchScreen: React.FC<SearchScreenRouteProps> = ({ route }) => {
  const { query } = route.params;
  const { getSearchedFormations } = useSearchFormations(query);
  const { data, isLoading } = getSearchedFormations;

  if (isLoading) return <Loading />;
  return (
    <Box flex={1} bg="WHITE" px="global_24">
      <HeaderHomeScreen />
      <ListFormationsDetails data={data?.results} />
    </Box>
  );
};
