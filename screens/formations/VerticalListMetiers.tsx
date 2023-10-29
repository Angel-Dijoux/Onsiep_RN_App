import React from "react";

import { FormationType } from "../../shared/formation/formation.type";
import { VerticalList } from "../../shared/list/VerticalList";
import { Box, Text } from "../../shared/ui/primitives";

const VerticalListMetiers = ({
  metiers,
}: {
  metiers?: FormationType["metiers_formation"]["metier"];
}) => {
  if (!metiers) return null;

  return (
    <>
      <Text variant="h3" color="GREY_DARK" my="global_10" ml="global_20">
        Métiers
      </Text>
      {Array.isArray(metiers) ? (
        <Box pt="global_20">
          <VerticalList data={metiers} />
        </Box>
      ) : (
        <Box
          bg="GREY_SEND_DARK"
          borderRadius="global_8"
          padding="global_15"
          mx="global_2"
        >
          <Text
            color="PRIMARY_2"
            fontWeight="700"
            fontFamily="satoshi"
            fontSize={14}
          >
            {metiers.libelle}
          </Text>
        </Box>
      )}
    </>
  );
};

export { VerticalListMetiers };
