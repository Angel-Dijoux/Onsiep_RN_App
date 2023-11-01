import { FlashList, ListRenderItem } from "@shopify/flash-list";
import React from "react";

import { Formation } from "../../shared/formation/fomationv2.type";
import { CardFormationDetails } from "../home/CardFormationDetails";
import { getFORId } from "../home/utils/stringUtils";
import { Box, Text } from "../../shared/ui/primitives";
import { deviceWidth } from "../../utils/deviceInfo";
import { FormationsRepartionGraph } from "../search/FormationsRepartionGraph";

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

const ListEmptyComponent = () => (
  <Box>
    <Text>EMPTY</Text>
  </Box>
);

export const ListFormationsDetails = ({
  data,
  handleEndReached,
  nestedScrollEnabled,
}: {
  data?: Formation[];
  handleEndReached: () => void;
  nestedScrollEnabled?: boolean;
}) => {
  return (
    <FlashList
      data={data}
      keyExtractor={(_, index: number) => index.toString() + _.url}
      ListHeaderComponent={FormationsRepartionGraph}
      renderItem={renderItemDetailCardFormations}
      estimatedItemSize={ESTIMATED_ITEM_HEIGHT}
      ListEmptyComponent={ListEmptyComponent}
      estimatedFirstItemOffset={10}
      estimatedListSize={{ height: ESTIMATED_ITEM_HEIGHT, width: deviceWidth }}
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      drawDistance={ESTIMATED_ITEM_HEIGHT * 1.5}
    />
  );
};

const ESTIMATED_ITEM_HEIGHT = 314;
