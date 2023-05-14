import { FlashList } from "@shopify/flash-list";
import React from "react";

import { Loading } from "../shared/ui/Loading";
import { Screen } from "../shared/ui/navigation/Screen";
import { Box, Text } from "../shared/ui/primitives";
import { useGetFormation } from "../src/hooks/formation/useGetFormation";

import { NoResult } from "../src/components/ui/no_result";
import { Metier, SousDomaineWeb } from "../shared/formation/formation.type";
import { deviceHeight } from "../utils/deviceInfo";

const Formation = ({ route }: { route: { params: { id: string } } }) => {
  const { id } = route.params;
  const forId = id.substring(id.length - 9);
  const { data, isLoading } = useGetFormation(forId);

  if (isLoading) return <Loading />;
  return (
    <Screen
      title={data?.type_Formation.type_formation_sigle}
      shouldSkipMargins
      isScrollable
      goBack
      edges={["top"]}
    >
      <Box pt="global_20">
        <Text variant="h3" color="GREY_DARK" my="global_10" ml="global_20">
          Métiers
        </Text>
        <FlashList
          data={data?.metiers_formation.metier}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          estimatedItemSize={deviceHeight}
          renderItem={({ item }: { item: Metier }) => {
            return (
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
                  fontSize={17}
                >
                  {item.libelle}, {item.id}
                </Text>
              </Box>
            );
          }}
        />
      </Box>
      <Text variant="h3" color="GREY_DARK" my="global_10" ml="global_20">
        Sous-domaines
      </Text>
      <FlashList
        data={data?.sous_domaines_web.sous_domaine_web}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={deviceHeight}
        renderItem={({ item }: { item: SousDomaineWeb }) => {
          return (
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
                fontSize={17}
              >
                {item.libelle}
              </Text>
            </Box>
          );
        }}
      />
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
                  fontSize={17}
                  fontFamily="satoshi"
                >
                  {item}
                </Text>
              </Box>
            );
          }}
        />
      </Box>
      <Text color="GREY_40" fontFamily="manrope" ml="global_20">
        {data?.sous_tutelle}
      </Text>
    </Screen>
  );
};

export { Formation };
