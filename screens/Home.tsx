import { FlashList, ListRenderItem } from "@shopify/flash-list";
import React from "react";

import { CardFormationDetails } from "./home/CardFormationDetails";
import { HeaderHomeScreen } from "./home/HeaderHomeScreen";
import { getFORId } from "./home/utils/stringUtils";
import { type Result } from "../shared/formation/onisepFormation.type";
import { Loading } from "../shared/ui/Loading";
import { Box } from "../shared/ui/primitives";
import { useGetOnisepFormations } from "../src/hooks/formation/useGetOnisepFormations";
import { deviceHeight } from "../utils/deviceInfo";

export const Home = () => {
  const { data, isLoading } = useGetOnisepFormations(25);

  const renderItem: ListRenderItem<Result> = ({ item }) => {
    const FORId = `FOR.${getFORId(item.url_et_id_onisep)}`;

    return (
      <CardFormationDetails
        title={item.libelle_formation_principal || "Formation"}
        duree={item.duree}
        level={item.niveau_de_sortie_indicatif}
        tutelle={item.tutelle}
        forId={FORId}
      />
    );
  };

  if (isLoading) return <Loading />;
  return (
    <Box flex={1} bg="WHITE" px="global_24">
      <HeaderHomeScreen />
      <FlashList
        data={data?.results}
        keyExtractor={(_, index: number) =>
          index.toString() + _.url_et_id_onisep
        }
        renderItem={renderItem}
        estimatedItemSize={deviceHeight}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
      />
    </Box>
  );
};
