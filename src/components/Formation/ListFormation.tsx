import { FlashList } from "@shopify/flash-list";
import React, { useContext } from "react";

import { Formation } from "../../../utils/onisep.type";
import { FavorisContext } from "../../context/FavorisContext";
import { CardFormation } from "../ui/CardFormation";

type ListFormationType = {
  data: Formation[];
  isFavScreen: boolean;
};

const ListFormation = ({ data, isFavScreen }: ListFormationType) => {
  const { PostFavoris, DeleteFavoris } = useContext(FavorisContext);

  const handleOnClick = (item: Formation) => {
    if (isFavScreen) {
      DeleteFavoris(item.id);
    } else {
      PostFavoris(item);
    }
  };

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
          onPress={() => handleOnClick}
        />
      )}
      estimatedItemSize={200}
    />
  );
};

export { ListFormation };
