import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import GetContentAPI from "../src/components/api/get_content_api";

import { AuthContext } from "../src/context/AuthContext";
import VirtualizedView from "./scrool";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FavorisContext } from "../src/context/FavorisContext";

const FavScreen = ({ navigation }) => {
  const { GetFavoris, favoris, favisloading } = useContext(FavorisContext);

  const netInfo = useNetInfo();
  const header = () => {
    return (
      <Text
        style={{
          marginLeft: "6%",
          marginTop: 17,
          fontWeight: "900",
          fontSize: 20,
        }}
      >
        Favoris, {String(netInfo.isConnected)}
      </Text>
    );
  };

  useEffect(() => {
    GetFavoris();
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
        <VirtualizedView>
          <GetContentAPI
            data={favoris.results}
            icon={require("../src/icons/trah.png")}
            width={"90%"}
            marginTop={"3%"}
            marginBottom={"5%"}
            header={header()}
          />
        </VirtualizedView>
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
            marginTop: "10%",
            marginBottom: "10%",
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F7F7",
  },
});
