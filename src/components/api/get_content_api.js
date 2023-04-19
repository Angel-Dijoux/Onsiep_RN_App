import { FlashList } from "@shopify/flash-list";
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { AuthContext } from "../../context/AuthContext";
import { FavorisContext } from "../../context/FavorisContext";

const GetContentAPI = (props) => {
  const { userToken, messages, setMessages, favoris } = useContext(AuthContext);
  const { PostFavoris, DeleteFavoris, GetFavoris } = useContext(FavorisContext);

  const header = () => {
    return props.header;
  };

  const GetIfIsInFav = (id) => {
    if (userToken) {
      if (favoris.size > 0) {
        let FavData = favoris.results;
        let isFound = false;
        let count = 0;
        while (!isFound && count < FavData.length) {
          if (id == FavData[count].url_et_id_onisep) {
            isFound = false;
            return true;
          } else {
            ++count;
          }
        }
      }
    }
  };

  const dataView = (
    <View
      style={{
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width,
      }}
    >
      <FlashList
        data={props.data}
        extraData={props.data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.url_et_id_onisep}
        renderItem={({ item, index }) => (
          <View
            style={{
              justifyContent: "center",
              marginTop: props.marginTop,
              marginBottom: props.marginBottom,
              paddingLeft: 25,
              paddingRight: 25,
            }}
          >
            <View style={{ ...styles.formation }}>
              <View style={styles.headFormation}>
                <Text style={styles.starFormation}>
                  {item.sigle_type_formation.charAt(0).toUpperCase() +
                    item.sigle_type_formation.slice(1) || "Non Renseigné"}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    console.log("No conditions");
                    if (userToken) {
                      if (props.post) {
                        console.log("post");
                        if (!GetIfIsInFav(item.url_et_id_onisep)) {
                          PostFavoris(
                            item.code_nsf,
                            item.sigle_type_formation,
                            item.libelle_type_formation,
                            item.libelle_formation_principal,
                            item.sigle_formation,
                            item.duree,
                            item.niveau_de_sortie_indicatif,
                            item.code_rncp,
                            item.niveau_de_certification,
                            item.libelle_niveau_de_certification,
                            item.tutelle,
                            item.url_et_id_onisep
                          );
                          GetFavoris();
                        }
                      } else {
                        console.log("delete");
                        DeleteFavoris(item.id);
                        GetFavoris();
                        // https://stackoverflow.com/questions/74771794/how-to-remove-data-from-flatlist-using-deleted-icon-in-react-native
                      }
                    } else {
                      const message = "Vous n'êtes pas connecter.";
                      setMessages([...messages, message]);
                    }
                  }}
                >
                  <Image
                    source={
                      !GetIfIsInFav(item.url_et_id_onisep)
                        ? require("../../icons/star.png")
                        : require("../../icons/trah.png")
                    }
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: "baseline",
                      shadowColor: "#000000",
                    }}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  marginBottom: 12,
                  fontWeight: "300",
                  fontStyle: "italic",
                  fontSize: 14,
                }}
              >
                {item.duree}
              </Text>
              <Text style={{ marginBottom: 10, fontSize: 17 }}>
                {item.libelle_type_formation.charAt(0).toUpperCase() +
                  item.libelle_type_formation.slice(1)}
              </Text>
              <Text style={{ marginBottom: 10, fontSize: 17 }} selectable>
                {item.libelle_formation_principal.charAt(0).toUpperCase() +
                  item.libelle_formation_principal.slice(1)}
              </Text>
            </View>
          </View>
        )}
        estimatedItemSize={200}
        initialNumToRender={18}
      />
    </View>
  );
  return dataView;
};

export default GetContentAPI;

const styles = StyleSheet.create({
  formation: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#FFD400",
    padding: 15,
    borderRadius: 8,
  },
  headFormation: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  starFormation: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: "2.5%",
    backgroundColor: "#FFD40D",
    width: "100%",
    borderRadius: 25,
    marginTop: 7,
    marginBottom: 7,
  },
  inputIcon: {
    width: 20,
    height: 20,
    padding: 14,
    marginLeft: 8,
    alignSelf: "center",
  },
  input: {
    marginLeft: 10,
    width: "100%",
  },
});
