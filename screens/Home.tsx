import { FlashList, ListRenderItem } from "@shopify/flash-list";
import React from "react";

import { CardFormationDetails } from "./home/CardFormationDetails";
import { HeaderHomeScreen } from "./home/HeaderHomeScreen";
import { getFORId } from "./home/utils/stringUtils";
import { type Result } from "../shared/formation/onisepFormation.type";
import { Loading } from "../shared/ui/Loading";
import { Box } from "../shared/ui/primitives";
import { useGetOnisepFormations } from "../src/hooks/formation/useGetOnisepFormations";
import { ListFormationsDetails } from "./formations/ListFormationsDetails";

export const Home = () => {
  const { data, isLoading } = useGetOnisepFormations(25);

  if (isLoading) return <Loading />;
  return (
    <Box flex={1} bg="WHITE" px="global_24">
      <HeaderHomeScreen />
      <ListFormationsDetails data={data?.results} />
    </Box>
  );
};
