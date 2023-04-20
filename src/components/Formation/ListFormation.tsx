import { FlashList } from "@shopify/flash-list";
import React from "react";

import { Formation } from "../../../utils/onisep.type";
import { CardFormation } from "../ui/CardFormation";

type ListFormationType = {
  data: Formation[];
  isFavScreen: boolean;
};

const ListFormation = ({ data, isFavScreen }: ListFormationType) => {
  console.log(data);
  return (
    <FlashList
      data={data}
      extraData={data}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.url_et_id_onisep}
      renderItem={({ item }) => (
        <CardFormation
          type={item.sigle_type_formation}
          duree={item.duree}
          libelle={item.libelle_type_formation}
          desc={item.libelle_formation_principal}
          isFavcreen={isFavScreen}
        />
      )}
      estimatedItemSize={200}
    />
  );
};

export { ListFormation };
