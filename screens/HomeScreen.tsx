import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import CheckBox from "expo-checkbox";
import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import DisplayMessages from "./../src/components/ui/Notification/display_messages";
import { FavorisContext } from "./../src/context/FavorisContext";
import FilterActive from "../src/components/ui/filter_active";
import FilterButton from "../src/components/ui/filter_button";
import NbResults from "../src/components/ui/nb_results";
import SearchBar from "../src/components/ui/search";
import ResultPage from "../src/components/ui/search_data";
import { AuthContext } from "../src/context/AuthContext";
import { OnisepContext } from "../src/context/OnisepContext";
import { Box, Text } from "../shared/ui/primitives";

const HomeScreen = ({ navigation }) => {
  const {
    searchFilter,
    filterFormation,
    returnGoodData,
    isloading,
    cliked,
    filterData,
    Filter,
    filterType,
    search,
    setcliked,
    setSearch,
    setFilterType,
    setFilter,
    messages,
    setMessages,
  } = useContext(OnisepContext);

  const { userInfo, userToken } = useContext(AuthContext);
  const { GetFavoris } = useContext(FavorisContext);

  // setup with useState
  const [isSelected, setSelection] = useState<boolean[]>([]);

  const handleBackButtonClick = () => {
    setSearch("");
    setSelection([]);
    if (Filter) {
      setFilter(false);
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  useEffect(() => {
    if (userToken) {
      GetFavoris();
    }
  }, []);

  type dataType = {
    code_nsf: number;
    code_rncp: number;
    duree: string;
    libelle_formation_principal: string;
    libelle_niveau_de_certification: string;
    libelle_type_formation: string;
    niveau_de_certification: string;
    niveau_de_sortie_indicatif: string;
    sigle_formation: string;
    sigle_type_formation: string;
    tutelle: string;
    url_et_id_onisep: string;

    item: any;
  };

  // return formation "sigle" for filter & tag
  const returnSigleFormation = () => {
    const dataa: dataType[] = filterData;
    const sigle_formation: string[] = [];

    if (filterData != undefined) {
      dataa.forEach((dataa: dataType) => {
        if (!sigle_formation.includes(dataa.libelle_type_formation)) {
          sigle_formation.push(dataa.libelle_type_formation);
        }
      });

      let dict_sigle_formation: { id: string };
      const result: {}[] = [];
      sigle_formation.forEach((element) => {
        dict_sigle_formation = { id: element };
        result.push(dict_sigle_formation);
      });
      return result;
    }
  };

  const ModalFlatlist = (): JSX.Element => {
    const flatlist = (
      <FlatList
        data={returnSigleFormation()}
        extraData={isSelected}
        renderItem={({ item }: any) => (
          <BottomSheetView
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 10,
              marginBottom: 8,
              marginTop: 8,
              width: "100%",
            }}
          >
            <BottomSheetView
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text
                numberOfLines={1}
                style={{ width: "95%", fontSize: 17, fontWeight: "500" }}
              >
                {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
              </Text>
              <CheckBox
                onValueChange={() => {
                  const newIds: boolean[] = [...isSelected];
                  const index: number = newIds.indexOf(item.id);
                  if (index > -1) {
                    newIds.splice(index, 1);
                  } else {
                    newIds.splice(index, 1);
                    newIds.push(item.id);
                    filterFormation(item.id);
                    setFilter(true);
                  }
                  setSelection(newIds);
                }}
                value={isSelected.includes(item.id)}
                color={isSelected ? "#1D7C91" : undefined}
                style={{ alignSelf: "center", padding: 10 }}
              />
            </BottomSheetView>
          </BottomSheetView>
        )}
        style={{
          marginTop: 5,
        }}
      />
    );
    return flatlist;
  };

  const FilterActiveTags = () => {
    if (Filter && filterType != null) {
      return (
        <FilterActive
          func={() => {
            setFilterType(null);
            setSelection([]);
          }}
        />
      );
    }
  };

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["15%", "65%"], []);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
      />
    ),
    []
  );

  // Filter bar with button filter and numbers of results
  const FilterBar = () => {
    if (search != "") {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 5,
            marginTop: 8,
            marginLeft: 3,
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              marginLeft: 20,
            }}
          >
            <FilterButton
              icon={require("../src/icons/sort.png")}
              func={handlePresentModalPress} // here
            />
            {FilterActiveTags()}
          </View>
          <NbResults data={returnGoodData().length} />
        </View>
      );
    }
  };
  const hi_me = () => {
    if (search == "") {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "5%",
            paddingRight: "1%",
            marginTop: "5%",
          }}
        >
          <Text
            style={{ fontWeight: "200", fontSize: 20, fontFamily: "Satoshi" }}
          >
            Hi{userToken ? `, ${userInfo.username}` : " "}
          </Text>
          <FilterButton
            icon={require("../src/icons/star.png")}
            func={() => {
              userToken
                ? navigation.navigate("Fav")
                : navigation.navigate("Login");
            }}
          />
        </View>
      );
    }
  };

  return (
    <BottomSheetModalProvider>
      <DisplayMessages />
      <View style={styles.container}>
        {hi_me()}
        <SearchBar
          name="Chercher une formation"
          search={search}
          icon={require("../src/icons/search.png")}
          loading={!isloading}
          func={(text: string) => searchFilter(text)}
          funcTouchableOpacity={() => {
            if (search != "") {
              setcliked(!cliked);
              setSearch("");
              setFilterType(null);
              setSelection([]);
            }
          }}
          funcSettings={() => navigation.navigate("Settings")}
          isHome
          iscliked={cliked}
        />
        {FilterBar()}
        <ResultPage />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView>
            <Text style={styles.text}>Trie par type de formations</Text>
            <ModalFlatlist />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F7F7F7",
    marginTop: 0,
  },
  text: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 19,
    fontWeight: "700",
  },
});
