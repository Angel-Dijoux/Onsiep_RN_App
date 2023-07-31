import React from "react";
import { Text } from "../../shared/ui/primitives";
import { VerticalList } from "../../shared/list/VerticalList";
import { FormationType } from "../../shared/formation/formation.type";

const VerticalListSubDomain = ({
  subDomainWeb,
}: {
  subDomainWeb?: FormationType["sous_domaines_web"]["sous_domaine_web"];
}) => (
  <>
    <Text variant="h3" color="GREY_DARK" my="global_10" ml="global_20">
      Sous-domaines
    </Text>
    <VerticalList data={subDomainWeb} />
  </>
);

export { VerticalListSubDomain };
