import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";

import { type FormationTabStackNavigationParamsList } from "../../../navigation/formations/FormationTabStackNavigation.types";
import { deviceHeight } from "../../../utils/deviceInfo";
import { Formation } from "../../../utils/onisep.type";
import { useFavoris } from "../../hooks/favoris/useFavoris";
import { CardFormation } from "../ui/CardFormation";

type ListFormationType = {
  data: Formation[];
  isFavScreen: boolean;
};

const ListFormation = ({ data, isFavScreen }: ListFormationType) => {
  const navigation =
    useNavigation<StackNavigationProp<FormationTabStackNavigationParamsList>>();
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

  const renderItem: ListRenderItem<Formation> = ({ item }) => (
    <CardFormation
      type={item.sigle_type_formation}
      duree={item.duree}
      libelle={item.libelle_type_formation}
      desc={item.libelle_formation_principal}
      isFavcreen={isFavScreen}
      onPress={() => handleOnClick(item.id)}
      onPressCard={() => {
        console.log("SS");
        navigation.navigate("FormationScreen", { id: item.url_et_id_onisep });
      }}
    />
  );

  return (
    <FlashList
      data={formations}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index: number) => index.toString() + _.url_et_id_onisep}
      estimatedItemSize={deviceHeight}
      decelerationRate="fast"
      renderItem={renderItem}
    />
  );
};

export { ListFormation };
