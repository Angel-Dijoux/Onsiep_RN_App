import { FlashList, ListRenderItem } from "@shopify/flash-list";
import React from "react";

import { Formation } from "../../shared/formation/fomationv2.type";
import { Box, Text } from "../../shared/ui/primitives";
import { deviceWidth } from "../../utils/deviceInfo";
import { CardFormationDetails } from "../home/CardFormationDetails";
import { FormationsRepartionGraph } from "../search/FormationsRepartionGraph";

// TODO: use api for this, idea: get 'details' from flask directly.
export const renderItemDetailCardFormations: ListRenderItem<Formation> = ({
  item,
}) => <CardFormationDetails item={item} />;

const ListEmptyComponent = () => (
  <Box>
    <Text>EMPTY</Text>
  </Box>
);

export const ListFormationsDetails = ({
  data,
  handleEndReached,
  query,
}: {
  data?: Formation[];
  handleEndReached: () => void;
  query?: string;
}) => {
  return (
    <FlashList
      data={data}
      keyExtractor={(_, index: number) => index.toString() + _.url}
      ListHeaderComponent={query ? FormationsRepartionGraph({ query }) : null}
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
