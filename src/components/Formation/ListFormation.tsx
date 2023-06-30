import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";

import { deviceHeight } from "../../../utils/deviceInfo";
import { Formation } from "../../../utils/onisep.type";
import { useFavoris } from "../../hooks/favoris/useFavoris";
import { CardFormation } from "../ui/CardFormation";

type ListFormationType = {
  data: Formation[];
  isFavScreen: boolean;
};

const ListFormation = ({ data, isFavScreen }: ListFormationType) => {
  const navigation = useNavigation();
  const [formations, setFormations] = useState<Formation[]>([]);

  const { handleDeleteFavoris } = useFavoris();

  useEffect(() => {
    setFormations(data);
  }, [data]);

  const handleOnClick = (id: number) => {
    if (isFavScreen) {
      setFormations(formations.filter((formations) => formations.id !== id));
      handleDeleteFavoris(id);
    }
  };

  return (
    <FlashList
      data={formations}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.url_et_id_onisep}
      estimatedItemSize={deviceHeight}
      decelerationRate="fast"
      renderItem={({ item }) => (
        <CardFormation
          type={item.sigle_type_formation}
          duree={item.duree}
          libelle={item.libelle_type_formation}
          desc={item.libelle_formation_principal}
          isFavcreen={isFavScreen}
          onPress={() => handleOnClick(item.id)}
          onPressCard={() => {
            navigation.navigate("Formation", { id: item.url_et_id_onisep });
          }}
        />
      )}
    />
  );
};

export { ListFormation };
