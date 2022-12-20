import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import GetContentAPI from "../src/components/api/get_content_api";

import { AuthContext } from "../src/context/AuthContext";
import VirtualizedView from "./scrool";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FavorisContext } from "../src/context/FavorisContext";
import NoResult from "../src/components/ui/no_result";
import Header from './../src/components/ui/header';

const FavScreen = ({ navigation }) => {
  const { GetFavoris, favoris, favisloading } = useContext(FavorisContext);

  const netInfo = useNetInfo();

  useEffect(() => {
    GetFavoris();
    console.log(favoris);
  }, []);
  const Favoris = () => {
    if (favisloading || favoris == null) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="small" color="#000000" />
        </View>
      );
    } else {
      return (
        <View>
          {favoris.size > 0 ? (
            <VirtualizedView>
              <GetContentAPI
                data={favoris.results}
                icon={require("../src/icons/trah.png")}
                width={"90%"}
                marginTop={"3%"}
                marginBottom={"5%"}
                header={<Header name='Favoris' nav={() => navigation.navigate("Home")} />}
              />
            </VirtualizedView>
          ) : (
            <View style={{ height: "100%" }}>
              <Header name='Favoris' nav={() => navigation.navigate("Home")} />
              <NoResult
                icon={require("../src/icons/noresult.png")}
                text={"Aucun favoris"}
              />
            </View>
          )}
        </View>
      );
    }
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {Favoris()}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default FavScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F7F7F7",
  },
});
