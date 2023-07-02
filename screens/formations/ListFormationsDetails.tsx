import { FlashList, ListRenderItem } from "@shopify/flash-list";
import React from "react";

import { Result } from "../../shared/formation/onisepFormation.type";
import { Loading } from "../../shared/ui/Loading";
import { useGetIfIsFav } from "../../src/hooks/favoris/useGetIfIsFav";
import { deviceHeight } from "../../utils/deviceInfo";
import { CardFormationDetails } from "../home/CardFormationDetails";
import { getFORId } from "../home/utils/stringUtils";

export const renderItemDetailCardFormations: ListRenderItem<Result> = ({
  item,
  extraData,
}) => {
  const FORId = `FOR.${getFORId(item.url_et_id_onisep)}`;
  const listOfFavFormations = extraData.listOfFavFormations;

  return (
    <CardFormationDetails
      item={item}
      listOfFavFormations={listOfFavFormations}
      title={item.libelle_formation_principal || "Formation"}
      duree={item.duree}
      level={item.niveau_de_sortie_indicatif}
      tutelle={item.tutelle}
      forId={FORId}
    />
  );
};

export const ListFormationsDetails = ({ data }: { data?: Result[] }) => {
  const { getIsFav } = useGetIfIsFav();
  const { data: isFavData, isLoading } = getIsFav;
  const listOfFavFormations = isFavData?.favori_ids;

  if (isLoading) return <Loading />;
  return (
    <FlashList
      data={data}
      extraData={{ listOfFavFormations }}
      keyExtractor={(_, index: number) => index.toString() + _.url_et_id_onisep}
      renderItem={renderItemDetailCardFormations}
      estimatedItemSize={deviceHeight}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
    />
  );
};
