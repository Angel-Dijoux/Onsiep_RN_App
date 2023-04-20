import { FlashList } from "@shopify/flash-list";
import React, { useContext, useEffect, useState } from "react";

import { Formation } from "../../../utils/onisep.type";
import { FavorisContext } from "../../context/FavorisContext";
import { CardFormation } from "../ui/CardFormation";

type ListFormationType = {
  data: Formation[];
  isFavScreen: boolean;
};

const ListFormation = ({ data, isFavScreen }: ListFormationType) => {
  const [formations, setFormations] = useState<Formation[]>(data);
  const { PostFavoris, DeleteFavoris, GetFavoris } = useContext(FavorisContext);

  const handleOnClick = (id: number) => {
    if (isFavScreen) {
      DeleteFavoris(id);
      setFormations(formations.filter((formations) => formations.id !== id));
    }
  };

  return (
    <FlashList
      data={formations}
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
          onPress={() => handleOnClick(item.id)}
        />
      )}
      estimatedItemSize={200}
    />
  );
};

export { ListFormation };
