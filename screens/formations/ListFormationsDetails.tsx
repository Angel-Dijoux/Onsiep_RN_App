import { FlashList, ListRenderItem } from "@shopify/flash-list";
import React from "react";

import { Result } from "../../shared/formation/onisepFormation.type";
import { deviceHeight } from "../../utils/deviceInfo";
import { CardFormationDetails } from "../home/CardFormationDetails";
import { getFORId } from "../home/utils/stringUtils";

export const renderItemDetailCardFormations: ListRenderItem<Result> = ({
  item,
}) => {
  const FORId = `FOR.${getFORId(item.url_et_id_onisep)}`;

  return (
    <CardFormationDetails
      item={item}
      title={item.libelle_formation_principal || "Formation"}
      duree={item.duree}
      level={item.niveau_de_sortie_indicatif}
      tutelle={item.tutelle}
      forId={FORId}
    />
  );
};

export const ListFormationsDetails = ({ data }: { data?: Result[] }) => (
  <FlashList
    data={data}
    keyExtractor={(_, index: number) => index.toString() + _.url_et_id_onisep}
    renderItem={renderItemDetailCardFormations}
    estimatedItemSize={deviceHeight}
    decelerationRate="fast"
    showsVerticalScrollIndicator={false}
  />
);
