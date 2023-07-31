import React from "react";
import { StyleSheet } from "react-native";
import HTML from "react-native-render-html";

import { VerticalListMetiers } from "./formations/VerticalListMetiers";
import { VerticalListStudyPursuits } from "./formations/VerticalListStudyPursuits";
import { VerticalListSubDomain } from "./formations/VerticalListSubDomain";
import { FormationScreenRouteProps } from "../navigation/formations/FormationTabStackNavigation.types";
import { Loading } from "../shared/ui/Loading";
import { Screen } from "../shared/ui/navigation/Screen";
import { Text } from "../shared/ui/primitives";
import { colors } from "../shared/ui/primitives/theme/colors";
import { textVariants } from "../shared/ui/primitives/theme/fonts";
import { useGetFormation } from "../src/hooks/formation/useGetFormation";

const Formation: React.FC<FormationScreenRouteProps> = ({ route }) => {
  const { id } = route.params;
  const { data, isLoading } = useGetFormation("FOR.1234");

  if (isLoading) return <Loading />;
  return (
    <Screen
      title={data?.type_Formation.type_formation_sigle}
      shouldSkipMargins
      isScrollable
      goBack
      edges={["top"]}
    >
      <VerticalListMetiers data={data?.metiers_formation} />
      <VerticalListSubDomain
        subDomainWeb={data?.sous_domaines_web.sous_domaine_web}
      />
      <VerticalListStudyPursuits
        studyPursuits={data?.poursuites_etudes?.poursuite_etudes}
      />
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

const styles = StyleSheet.create({
  heading: {
    ...textVariants.h3,
    color: colors.THIRD_DARK,
  },
  listItem: {
    marginBottom: 5,
  },
});

export { Formation };
