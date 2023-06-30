import React from "react";
import { Box } from "../shared/ui/primitives";
import { useGetOnisepFormations } from "../src/hooks/formation/useGetOnisepFormations";
import { CardFormationDetails } from "./home/CardFormationDetails";
import { HeaderHomeScreen } from "./home/HeaderHomeScreen";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Loading } from "../shared/ui/Loading";
import { type Result } from "../shared/formation/onisepFormation.type";
import { deviceHeight } from "../utils/deviceInfo";

export const Home = () => {
  const { data, isLoading } = useGetOnisepFormations(5);

  const renderItem: ListRenderItem<Result> = ({ item, index, extraData }) => {
    const FORId = item.url_et_id_onisep.substring(
      item.url_et_id_onisep.length - 9
    );

    return (
      <CardFormationDetails
        title={item.libelle_type_formation || "Formation"}
        duree={item.duree}
        level={item.niveau_de_sortie_indicatif}
        tutelle={item.tutelle}
        forId={FORId}
        displayDetails
      />
    );
  };

  if (isLoading) return <Loading />;
  return (
    <Box flex={1} bg="WHITE" p="global_24">
      <HeaderHomeScreen />
      <FlashList
        data={data?.results}
        keyExtractor={(_, index: number) => index.toString()}
        renderItem={renderItem}
        estimatedItemSize={deviceHeight}
        decelerationRate="fast"
      />
    </Box>
  );
};
