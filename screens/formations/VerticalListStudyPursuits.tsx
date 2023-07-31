import { FlashList, ListRenderItem } from "@shopify/flash-list";
import React from "react";

import { PoursuitesEtudes } from "../../shared/formation/formation.type";
import { Box, Text } from "../../shared/ui/primitives";
import { deviceHeight } from "../../utils/deviceInfo";

const renderItem: ListRenderItem<string> = ({ item }) => (
  <Box
    bg="GREY_90"
    borderRadius="global_8"
    my="global_5"
    padding="global_10"
    height={130}
    width="95%"
    justifyContent="center"
  >
    <Text
      color="SECONDARY_BASE"
      fontWeight="700"
      fontSize={14}
      fontFamily="satoshi"
    >
      {item}
    </Text>
  </Box>
);

const VerticalListStudyPursuits = ({
  studyPursuits,
}: {
  studyPursuits?: PoursuitesEtudes["poursuite_etudes"];
}) => {
  if (studyPursuits?.formation_poursuite_Etudes.length == 0) return null;

  return (
    <Box mx="global_20">
      <FlashList
        data={studyPursuits?.formation_poursuite_Etudes}
        numColumns={2}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={deviceHeight}
        renderItem={renderItem}
      />
    </Box>
  );
};

export { VerticalListStudyPursuits };
