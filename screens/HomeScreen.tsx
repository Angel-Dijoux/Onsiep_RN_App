import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import CheckBox from "expo-checkbox";
import VirtualizedView from "./scrool";
import SearchBar from "../src/components/ui/search";
import FilterButton from "../src/components/ui/filter_button";
import FilterActive from "../src/components/ui/filter_active";
import ModalFilter, {
  ModalFilterRefProps,
} from "../src/components/ui/modal_filter";
import NbResults from "../src/components/ui/nb_results";
import { OnisepContext } from "../src/context/OnisepContext";

import ResultPage from "../src/components/ui/search_data";
import { AuthContext } from "../src/context/AuthContext";
import ItemSeparator from "../src/components/ui/item_seperator";

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
  } = useContext(OnisepContext);

  const { userInfo, userToken } = useContext(AuthContext);

  //setup with useState
  const [isSelected, setSelection] = useState([]);

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

  //return formation "sigle" for filter & tag
  const returnSigleFormation = () => {
    type dataType = {
      libelle_type_formation: string;
    };
    const dataa: dataType[] = filterData;
    const sigle_formation = [];

    if (filterData != undefined) {
      dataa.forEach((dataa: dataType) => {
        if (!sigle_formation.includes(dataa.libelle_type_formation)) {
          sigle_formation.push(dataa.libelle_type_formation);
        }
      });

      let dict_sigle_formation = {};
      const result = [];
      sigle_formation.forEach((element) => {
        dict_sigle_formation = { id: element };
        result.push(dict_sigle_formation);
      });
      return result;
    }
  };

  const ModalFlatlist = () => {
    const flatlist = (
      <FlatList
        data={returnSigleFormation()}
        extraData={isSelected}
        renderItem={({ item }) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 10,
              marginBottom: 8,
              marginTop: 8,
              width: "99%",
            }}
          >
            <View
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
                {item.id}
              </Text>
              <CheckBox
                onValueChange={() => {
                  const newIds = [...isSelected];
                  const index = newIds.indexOf(item.id);
                  if (index > -1) {
                    newIds.splice(index, 1);
                  } else {
                    newIds.splice(index, 1);
                    newIds.push(item.id);
                    filterFormation(item.id);
                    setFilter(true);
                    setTimeout(() => {
                      ref?.current?.scroolTo(0);
                    }, 500);
                  }
                  setSelection(newIds);
                }}
                value={isSelected.includes(item.id)}
                color={isSelected ? "#1D7C91" : undefined}
                style={{ alignSelf: "center", padding: 10 }}
              />
            </View>
          </View>
        )}
        style={{
          marginBottom: "40%",
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

  const ref = useRef<ModalFilterRefProps>(null);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scroolTo(0);
    } else {
      ref?.current?.scroolTo(-200);
    }
  }, []);

  //Filter bar with button filter and numbers of results
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
              func={onPress} //here
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
            marginTop: 40,
          }}
        >
          <Text style={{ fontWeight: "900", fontSize: 20 }}>
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {hi_me()}
        <SearchBar
          name={"Chercher une formation"}
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
          isHome={true}
          iscliked={cliked}
        />
        <VirtualizedView>
          {FilterBar()}
          <View style={{ marginBottom: "15%" }}>
            <ResultPage />
          </View>
        </VirtualizedView>
        {search != "" ? (
          <ModalFilter ref={ref}>
            <View>
              <Text style={styles.text}>Trie par type de formations</Text>
              <ModalFlatlist />
            </View>
          </ModalFilter>
        ) : (
          <View></View>
        )}
      </View>
    </GestureHandlerRootView>
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
