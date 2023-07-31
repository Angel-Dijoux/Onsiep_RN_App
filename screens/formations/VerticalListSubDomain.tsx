import React from "react";

import { FormationType } from "../../shared/formation/formation.type";
import { VerticalList } from "../../shared/list/VerticalList";
import { Text } from "../../shared/ui/primitives";

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
