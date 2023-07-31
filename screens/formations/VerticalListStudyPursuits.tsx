import { FlashList, ListRenderItem } from "@shopify/flash-list";
import React from "react";

import { PoursuitesEtudes } from "../../shared/formation/formation.type";
import { Libelle } from "../../shared/ui/Libelle";
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
  if (
    studyPursuits?.formation_poursuite_Etudes.length == 0 ||
    studyPursuits?.formation_poursuite_Etudes == undefined
  )
    return null;

  if (Array.isArray(studyPursuits?.formation_poursuite_Etudes)) {
    return (
      <>
        <Text variant="h3" color="GREY_DARK" my="global_10" ml="global_20">
          {studyPursuits?.type_Poursuite ?? "Poursuite d'études"}
        </Text>
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
      </>
    );
  }

  return (
    <>
      <Text variant="h3" color="GREY_DARK" my="global_10" ml="global_20">
        {studyPursuits?.type_Poursuite ?? "Poursuite d'études"}
      </Text>
      <Libelle text={String(studyPursuits?.formation_poursuite_Etudes)} />
    </>
  );
};

export { VerticalListStudyPursuits };
