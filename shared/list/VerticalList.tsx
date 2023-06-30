import { FlashList } from "@shopify/flash-list";
import React from "react";

import { deviceHeight } from "../../utils/deviceInfo";
import { type Metier, type SousDomaineWeb } from "../formation/formation.type";
import { Box, Text } from "../ui/primitives";

type ItemType = Metier | SousDomaineWeb;

const VerticalList = ({ data }: { data?: ItemType[] }) => {
  return (
    <FlashList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      estimatedItemSize={deviceHeight}
      renderItem={({ item }: { item: ItemType }) => {
        return (
          <Box
            bg="GREY_90"
            borderRadius="global_8"
            padding="global_15"
            mx="global_2"
          >
            <Text
              color="SECONDARY_BASE"
              fontWeight="700"
              fontFamily="satoshi"
              fontSize={14}
            >
              {item.libelle}
            </Text>
          </Box>
        );
      }}
    />
  );
};

export { VerticalList };
