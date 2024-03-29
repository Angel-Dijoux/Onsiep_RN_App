import { useRoute } from "@react-navigation/native";
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
import { colors } from "../shared/ui/theme/colors";
import { textVariants } from "../shared/ui/theme/fonts";
import { spacing } from "../shared/ui/theme/spacing";
import { useGetFormation } from "../src/hooks/formation/useGetFormation";

const Formation: React.FC<FormationScreenRouteProps> = () => {
  const route = useRoute<FormationScreenRouteProps["route"]>();
  const { id } = route.params;
  const { data, isLoading } = useGetFormation(id);

  if (isLoading) return <Loading />;
  return (
    <Screen
      title={data?.type_Formation.type_formation_libelle}
      shouldSkipMargins
      isScrollable
      goBack
      edges={["top"]}
    >
      <VerticalListMetiers metiers={data?.metiers_formation.metier} />
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
      <Text
        color="GREY_SAND"
        fontFamily="manrope"
        mx="global_20"
        mt="global_15"
      >
        {data?.sous_tutelle}
      </Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  heading: {
    ...textVariants.h3,
    marginLeft: spacing.global_10,
    marginRight: spacing.global_10,
    color: colors.BLACK,
  },
  listItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export { Formation };
