import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";

import { formattedHtml, transformHTMLData } from "./utils/parseHtml";
import { Result } from "../../shared/formation/onisepFormation.type";
import { Label } from "../../shared/ui/Label";
import { Loading } from "../../shared/ui/Loading";
import { Box, Text } from "../../shared/ui/primitives";
import { borderRadii } from "../../shared/ui/primitives/theme/borderRadii";
import { colors } from "../../shared/ui/primitives/theme/colors";
import { spacing } from "../../shared/ui/primitives/theme/spacing";
import { useFavoris } from "../../src/hooks/favoris/useFavoris";
import { useGetIfIsFav } from "../../src/hooks/favoris/useGetIfIsFav";
import { useGetFormation } from "../../src/hooks/formation/useGetFormation";
import { deviceHeight } from "../../utils/deviceInfo";

interface CardFormationDetailsProps {
  item: Result;
  title: string;
  duree: string;
  level: string;
  tutelle: string;
  forId: string;
}

export const CardFormationDetails = ({
  item,
  title,
  duree,
  level,
  tutelle,
  forId,
}: CardFormationDetailsProps) => {
  const [isFav, setIsFav] = useState<boolean>(false);

  const { isLoading, data } = useGetFormation(forId);
  const { getIsFav } = useGetIfIsFav(item.url_et_id_onisep);
  const { data: isFavData, isLoading: isFavLoading } = getIsFav;
  const { handleAddFavoris, handleDeleteFavoris } = useFavoris();

  useEffect(() => {
    if (isFavData?.is_fav) {
      setIsFav(isFavData.is_fav);
    }
  }, [isFavData]);

  const handleFavoris = (item: Result): void => {
    if (isFavData?.is_fav && isFavData.favori_id) {
      handleDeleteFavoris(isFavData.favori_id);
      setIsFav(false);
    }
    handleAddFavoris(item);
    setIsFav(true);
  };

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

  if (isLoading || isFavLoading) return <Loading />;
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
      {data?.identifiant && (
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
          <Box
            bg="PRIMARY_DARK"
            p="global_10"
            borderRadius="round"
            alignItems="center"
            mt="global_10"
          >
            <Text variant="large">En savoir plus</Text>
          </Box>
        </>
      )}

      <Pressable
        onPress={() => handleFavoris(item)}
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: spacing.global_20,
        }}
      >
        <AntDesign
          name={isFav ? "star" : "staro"}
          size={24}
          color={colors.WHITE}
          style={{
            backgroundColor: colors.PRIMARY_DARK,
            borderRadius: borderRadii.round,
            padding: spacing.global_8,
          }}
        />
      </Pressable>
    </Box>
  );
};
