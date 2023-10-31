import { FlashList, ListRenderItem } from "@shopify/flash-list";
import React from "react";

import { Formation } from "../../shared/formation/fomationv2.type";
import { deviceHeight } from "../../utils/deviceInfo";
import { CardFormationDetails } from "../home/CardFormationDetails";
import { getFORId } from "../home/utils/stringUtils";

export const renderItemDetailCardFormations: ListRenderItem<Formation> = ({
  item,
}) => {
  const FORId = `FOR.${getFORId(item.url)}`;

  return (
    <CardFormationDetails
      item={item}
      title={item.libelle || "Formation"}
      duree={item.duree}
      level={item.niveau_de_sortie}
      tutelle={item.tutelle}
      forId={FORId}
    />
  );
};

export const ListFormationsDetails = ({
  data,
  handleEndReached,
}: {
  data?: Formation[];
  handleEndReached: () => void;
}) => {
  return (
    <FlashList
      data={data}
      keyExtractor={(_, index: number) => index.toString() + _.url}
      renderItem={renderItemDetailCardFormations}
      estimatedItemSize={deviceHeight}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
    />
  );
};
