import React from "react";

import { Screen } from "../shared/ui/navigation/Screen";
import { Box, Text } from "../shared/ui/primitives";

import { useGetFormation } from "../src/hooks/formation/useGetFormation";
import { Loading } from "../shared/ui/Loading";
import { FlashList } from "@shopify/flash-list";
import { fontFamily } from "../shared/ui/primitives/theme/fonts";

const Formation = ({ route }: { route: { params: { id: string } } }) => {
  const { id } = route.params;
  const forId = id.substring(id.length - 9);
  const { data, isLoading } = useGetFormation(forId);

  if (isLoading) return <Loading />;
  return (
    <Screen title={data.type_Formation.type_formation_sigle}>
      <Box pt="global_20">
        <Text variant="h3" color="GREY_DARK" my="global_10">
          Métiers
        </Text>
        <FlashList
          data={data.metiers_formation.metier}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }: { item: any }) => {
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
      </Box>
      <Text variant="h3" color="GREY_DARK" my="global_10">
        Sous-domaines
      </Text>
      <FlashList
        data={data.sous_domaines_web.sous_domaine_web}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: { item: any }) => {
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
      <Text variant="h3" color="GREY_DARK" mt="global_10">
        Poursuites d'études
      </Text>
      <Text color="GREY_40" mb="global_10">
        {data.poursuites_etudes.poursuite_etudes.type_Poursuite}
      </Text>
      <FlashList
        data={
          data.poursuites_etudes.poursuite_etudes.formation_poursuite_Etudes
        }
        numColumns={2}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: any }) => {
          return (
            <Box
              bg="GREY_90"
              borderRadius="global_8"
              padding="global_10"
              mx="global_5"
              my="global_5"
              height={130}
              width="90%"
              justifyContent="center"
              alignItems="flex-start"
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
      <Text color="GREY_40" fontFamily="manrope">
        {data.sous_tutelle}
      </Text>
    </Screen>
  );
};

export { Formation };
