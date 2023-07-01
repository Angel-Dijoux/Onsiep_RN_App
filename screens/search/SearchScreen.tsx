import React from "react";

import { SearchScreenRouteProps } from "../../navigation/formations/FormationTabStackNavigation.types";
import { useSearchFormations } from "../../src/hooks/formation/useSearchFormations";
import { Loading } from "../../shared/ui/Loading";
import { Box } from "../../shared/ui/primitives";
import { HeaderHomeScreen } from "../home/HeaderHomeScreen";

import { ListFormationsDetails } from "../formations/ListFormationsDetails";

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
