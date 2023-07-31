import React from "react";

import { FormationType } from "../../shared/formation/formation.type";
import { VerticalList } from "../../shared/list/VerticalList";
import { Box, Text } from "../../shared/ui/primitives";

const VerticalListMetiers = ({
  data,
}: {
  data?: FormationType["metiers_formation"];
}) => {
  return (
    <>
      <Text variant="h3" color="GREY_DARK" my="global_10" ml="global_20">
        Métiers
      </Text>
      {data?.metier &&
        (Array.isArray(data.metier) ? (
          <Box pt="global_20">
            <VerticalList data={data.metier} />
          </Box>
        ) : (
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
              {data.metier.libelle}
            </Text>
          </Box>
        ))}
    </>
  );
};

export { VerticalListMetiers };
