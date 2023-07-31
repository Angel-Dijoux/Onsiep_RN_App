import { FlashList, ListRenderItem } from "@shopify/flash-list";
import React from "react";

import { deviceHeight } from "../../utils/deviceInfo";
import { type Metier, type SousDomaineWeb } from "../formation/formation.type";
import { Box, Text } from "../ui/primitives";
import { Libelle } from "../ui/Libelle";

type ItemType = Metier | SousDomaineWeb;

const renderItem: ListRenderItem<ItemType> = ({ item }) => (
  <Libelle text={item.libelle} />
);

const VerticalList = ({ data }: { data?: ItemType[] }) => {
  return (
    <FlashList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      estimatedItemSize={deviceHeight}
      renderItem={renderItem}
    />
  );
};

export { VerticalList };
