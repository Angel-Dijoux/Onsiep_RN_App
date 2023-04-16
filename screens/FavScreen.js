import { useNetInfo } from "@react-native-community/netinfo";
import React, { useContext, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, BackHandler } from "react-native";

import Header from "./../src/components/ui/header";
import GetContentAPI from "../src/components/api/get_content_api";
import NoResult from "../src/components/ui/no_result";
import { AuthContext } from "../src/context/AuthContext";
import { FavorisContext } from "../src/context/FavorisContext";

const FavScreen = ({ navigation }) => {
  const { favisloading } = useContext(FavorisContext);
  const { favoris } = useContext(AuthContext);

  const handleBackButtonClick = () => {
    navigation.navigate("Home");
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

  const netInfo = useNetInfo();
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
            <GetContentAPI
              data={favoris.results}
              icon={require("../src/icons/trah.png")}
              width="100%"
              marginTop="3%"
              marginBottom="5%"
              header={
                <Header
                  name="Favoris"
                  nav={() => navigation.navigate("Home")}
                />
              }
            />
          ) : (
            <>
              <Header name="Favoris" nav={() => navigation.navigate("Home")} />
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "80%",
                  marginTop: "20%",
                }}
              >
                <NoResult
                  icon={require("../src/icons/noresult.png")}
                  text="Aucun favoris"
                />
              </View>
            </>
          )}
        </View>
      );
    }
  };
  return (
    <View style={styles.container}>
      <View>{Favoris()}</View>
    </View>
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
