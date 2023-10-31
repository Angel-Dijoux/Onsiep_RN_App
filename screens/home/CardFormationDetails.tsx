import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Pressable } from "react-native";

import { formattedHtml, transformHTMLData } from "./utils/parseHtml";
import { AccountTabStackNavigationParamsList } from "../../navigation/account/AccountTabStackNavigation.types";
import { FormationTabStackNavigationParamsList } from "../../navigation/formations/FormationTabStackNavigation.types";
import { Formation } from "../../shared/formation/fomationv2.type";
import { Label } from "../../shared/ui/Label";
import { Loading } from "../../shared/ui/Loading";
import { Box, Text } from "../../shared/ui/primitives";
import { borderRadii } from "../../shared/ui/primitives/theme/borderRadii";
import { colors } from "../../shared/ui/primitives/theme/colors";
import { spacing } from "../../shared/ui/primitives/theme/spacing";
import { useAddFavoris } from "../../src/hooks/favoris/useAddFavoris";
import { useGetFormation } from "../../src/hooks/formation/useGetFormation";
import { useCurrentUser } from "../../src/hooks/user/useCurrentUser";
import { deviceHeight } from "../../utils/deviceInfo";

interface CardFormationDetailsProps {
  item: Formation;
  title: string;
  duree: string;
  level: string;
  tutelle: string;
  forId: string;
}

function capitalizeFirstLetter(inputString: string): string {
  if (inputString.length === 0) return inputString;
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

export const CardFormationDetails = ({
  item,
  title,
  duree,
  level,
  tutelle,
  forId,
}: CardFormationDetailsProps) => {
  const navigation =
    useNavigation<StackNavigationProp<FormationTabStackNavigationParamsList>>();

  const secondNavigation =
    useNavigation<StackNavigationProp<AccountTabStackNavigationParamsList>>();

  const { accessToken } = useCurrentUser();

  const { isLoading, data } = useGetFormation(forId);

  const { handleAddFavoris } = useAddFavoris();

  const handleFavoris = (item: Formation): void => {
    if (accessToken) {
      handleAddFavoris(item);
    } else {
      secondNavigation.navigate("LoginScreen");
    }
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

  if (isLoading) return <Loading />;
  return (
    <Box bg="PRIMARY_2" mt="global_15" p="global_15" borderRadius="global_8">
      <Text variant="h3" color="PRIMARY_12">
        {capitalizeFirstLetter(title)}
      </Text>
      <Box flexDirection="row" mt="global_5">
        <Label text={duree} />
        <Label text={level} />
      </Box>
      <Label text={tutelle} />
      {data?.identifiant && (
        <>
          {formattedAttendus.length > 0 && (
            <>
              <Text
                variant="xlarge"
                fontWeight="700"
                color="PRIMARY_12"
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
                        color="PRIMARY_12"
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
                color="PRIMARY_12"
                my="global_10"
              >
                {data?.poursuites_etudes.poursuite_etudes.type_Poursuite}
              </Text>
              <Box flexDirection="column" justifyContent="flex-start">
                {etudesList.map((etude) => (
                  <Label
                    key={etude}
                    text={etude}
                    bg="PRIMARY_1"
                    color="WHITE"
                  />
                ))}
              </Box>
            </Box>
          )}
          <Pressable
            onPress={() => {
              navigation.navigate("FormationScreen", {
                id: forId,
              });
            }}
          >
            <Box
              bg="PRIMARY_1"
              p="global_10"
              borderRadius="round"
              alignItems="center"
              mt="global_10"
            >
              <Text color="PRIMARY_12" variant="large">
                En savoir plus
              </Text>
            </Box>
          </Pressable>
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
          name="staro"
          size={24}
          color={colors.PRIMARY_1}
          style={{
            backgroundColor: colors.PRIMARY_9,
            borderRadius: borderRadii.round,
            padding: spacing.global_8,
          }}
        />
      </Pressable>
    </Box>
  );
};
