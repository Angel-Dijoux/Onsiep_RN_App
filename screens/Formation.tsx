import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet } from "react-native";
import HTML from "react-native-render-html";

import { FormationScreenRouteProps } from "../navigation/formations/FormationTabStackNavigation.types";
import { VerticalList } from "../shared/list/VerticalList";
import { Loading } from "../shared/ui/Loading";
import { Screen } from "../shared/ui/navigation/Screen";
import { Box, Text } from "../shared/ui/primitives";
import { colors } from "../shared/ui/primitives/theme/colors";
import { textVariants } from "../shared/ui/primitives/theme/fonts";
import { NoResult } from "../src/components/ui/no_result";
import { useGetFormation } from "../src/hooks/formation/useGetFormation";
import { deviceHeight } from "../utils/deviceInfo";

const Formation: React.FC<FormationScreenRouteProps> = ({ route }) => {
  const { id } = route.params;
  const { data, isLoading } = useGetFormation("FOR.1231");

  const styles = StyleSheet.create({
    heading: {
      ...textVariants.h3,
      color: colors.THIRD_DARK,
    },
    listItem: {
      marginBottom: 5,
    },
  });

  if (isLoading) return <Loading />;
  return (
    <Screen
      title={data?.type_Formation.type_formation_sigle}
      shouldSkipMargins
      isScrollable
      goBack
      edges={["top"]}
    >
      {data?.metiers_formation.metier &&
        (Array.isArray(data.metiers_formation.metier) ? (
          <Box pt="global_20">
            <Text variant="h3" color="GREY_DARK" my="global_10" ml="global_20">
              Métiers
            </Text>
            <VerticalList data={data.metiers_formation.metier} />
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
              {data.metiers_formation.metier.libelle}
            </Text>
          </Box>
        ))}

      <Text variant="h3" color="GREY_DARK" my="global_10" ml="global_20">
        Sous-domaines
      </Text>
      <VerticalList data={data?.sous_domaines_web.sous_domaine_web} />
      <Text variant="h3" color="GREY_DARK" mt="global_10" ml="global_20">
        Poursuites d'études
      </Text>
      <Text color="GREY_40" mb="global_10" ml="global_20">
        {data?.poursuites_etudes?.poursuite_etudes.type_Poursuite}
      </Text>
      <Box mx="global_20">
        <FlashList
          data={
            data?.poursuites_etudes?.poursuite_etudes.formation_poursuite_Etudes
          }
          numColumns={2}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return <NoResult text="Oh il n'y a pas de données..." />;
          }}
          estimatedItemSize={deviceHeight}
          renderItem={({ item }: { item: string }) => {
            return (
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
          }}
        />
      </Box>
      <HTML
        source={{ html: data?.attendus ?? "" }}
        tagsStyles={{
          h5: styles.heading,
          li: styles.listItem,
        }}
      />
      <Text color="GREY_40" fontFamily="manrope" ml="global_20">
        {data?.sous_tutelle}
      </Text>
    </Screen>
  );
};

export { Formation };
