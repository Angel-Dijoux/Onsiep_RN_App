import React from "react";
import { Box, Text } from "../../shared/ui/primitives";
import { Label } from "../../shared/ui/Label";
import { useGetFormation } from "../../src/hooks/formation/useGetFormation";
import { Loading } from "../../shared/ui/Loading";
import { formattedHtml, transformHTMLData } from "./utils/parseHtml";
import { deviceHeight } from "../../utils/deviceInfo";

import { LinearGradient } from "expo-linear-gradient";
import { easeGradient } from "react-native-easing-gradient";

interface CardFormationDetailsProps {
  title: string;
  duree: string;
  level: string;
  tutelle: string;
  displayDetails?: boolean;
  forId: string;
}

export const CardFormationDetails = ({
  title,
  duree,
  level,
  tutelle,
  displayDetails,
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

  const { colors, locations } = easeGradient({
    colorStops: {
      0: {
        color: "transparent",
      },
      1: {
        color: "rgba(0,0,0,0.6)",
      },
    },
    extraColorStopsPerTransition: 16,
  });

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
          {formattedAttendus && (
            <>
              <Text
                variant="xlarge"
                fontWeight="700"
                color="BLACK"
                my="global_10"
              >
                Attendus ParcourSup
              </Text>
              <LinearGradient colors={colors} locations={locations}>
                <Box maxHeight={deviceHeight * 0.18} overflow="hidden">
                  {formattedAttendus.map((item, index) => {
                    return (
                      <>
                        <Text
                          variant="large"
                          fontWeight="600"
                          my="global_5"
                          color="BLACK"
                          key={index}
                        >
                          {item.type}
                        </Text>
                        {item.attendus.map((attendu, index) => (
                          <Text key={index}>{attendu}</Text>
                        ))}
                      </>
                    );
                  })}
                </Box>
              </LinearGradient>
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
