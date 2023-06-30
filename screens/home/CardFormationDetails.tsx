import React from "react";

import { formattedHtml, transformHTMLData } from "./utils/parseHtml";
import { Label } from "../../shared/ui/Label";
import { Loading } from "../../shared/ui/Loading";
import { Box, Text } from "../../shared/ui/primitives";
import { useGetFormation } from "../../src/hooks/formation/useGetFormation";
import { deviceHeight } from "../../utils/deviceInfo";

interface CardFormationDetailsProps {
  title: string;
  duree: string;
  level: string;
  tutelle: string;
  forId: string;
}

export const CardFormationDetails = ({
  title,
  duree,
  level,
  tutelle,
  forId,
}: CardFormationDetailsProps) => {
  const { isLoading, data } = useGetFormation(forId);

  let formattedAttendus: formattedHtml = [];
  if (data?.attendus) {
    formattedAttendus = transformHTMLData(String(data?.attendus));
  }

  const poursuiteEtudes =
    data?.poursuites_etudes?.poursuite_etudes.formation_poursuite_Etudes;
  let etudesList: string[] = [];
  if (typeof poursuiteEtudes === "string") {
    etudesList = [poursuiteEtudes];
  } else if (Array.isArray(poursuiteEtudes)) {
    etudesList = poursuiteEtudes.slice(0, 4);
  }

  if (isLoading) return <Loading />;
  return (
    <Box
      bg="SECONDARY_DARK"
      mt="global_15"
      p="global_15"
      borderRadius="global_8"
    >
      <Text variant="h3" color="BLACK">
        {title}
      </Text>
      <Box flexDirection="row">
        <Label text={duree} bg="WHITE" />
        <Label text={level} bg="WHITE" />
      </Box>
      <Label text={tutelle} bg="WHITE" />
      {data && (
        <>
          {formattedAttendus.length > 0 && (
            <>
              <Text
                variant="xlarge"
                fontWeight="700"
                color="BLACK"
                my="global_10"
              >
                Attendus ParcourSup
              </Text>
              <Box maxHeight={deviceHeight * 0.18} overflow="hidden">
                {formattedAttendus.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Text
                        variant="large"
                        fontWeight="600"
                        my="global_5"
                        color="BLACK"
                        textDecorationLine="underline"
                      >
                        {item.type}
                      </Text>
                      {item.attendus.map((attendu, index) => (
                        <Text key={index}>{attendu}</Text>
                      ))}
                    </React.Fragment>
                  );
                })}
              </Box>
            </>
          )}

          {data?.poursuites_etudes && (
            <Box>
              <Text
                variant="xlarge"
                fontWeight="700"
                color="BLACK"
                my="global_10"
              >
                {data?.poursuites_etudes.poursuite_etudes.type_Poursuite}
              </Text>
              <Box flexDirection="column" justifyContent="flex-start">
                {etudesList.map((etude) => (
                  <Label
                    key={etude}
                    text={etude}
                    bg="THIRD_DARK"
                    color="WHITE"
                  />
                ))}
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
