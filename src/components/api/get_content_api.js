import React, { useContext, useEffect, useState } from "react";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  Dimensions,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { FavorisContext } from "../../context/FavorisContext";

const GetContentAPI = (props) => {
  const { userToken, messages, setMessages } = useContext(AuthContext);
  const { PostFavoris, DeleteFavoris, GetFavoris, favoris, favisloading } = useContext(FavorisContext);

  let islog = false;

  useEffect(() => {
    if (islog) {
      GetFavoris();
      console.log(favoris);
    }
  }, [islog]);

  const [data, setData] = useState(null);

  const header = () => {
    return props.header;
  };

  /*     const swip = (progress, dragX) => { //When flatlist is stable
        const scale = dragX.interpolate({
            inputRange: [0, 145],
            outputRange: [0, 1],
        })
        return (
            <Animated.View style={{ 
                transform: [{rotate: '180deg'}], 
                flexDirection:"column",
                alignItems: "flex-start",
                padding: 15,
                justifyContent: "center",
                alignItems:"center"}}> 
                <TouchableOpacity
                    onPress={() => {
                         PostFavoris(
                            data.code_nsf,
                            data.sigle_type_formation,
                            data.libelle_type_formation,
                            data.libelle_formation_principal,
                            data.sigle_formation,
                            data.duree,
                            data.niveau_de_sortie_indicatif,
                            data.code_rncp,
                            data.niveau_de_certification,
                            data.libelle_niveau_de_certification,
                            data.tutelle, 
                            data.url_et_id_onisep, 
                        )
                    }}
                > 
                <Animated.Image 
                    source={props.icon}
                    resizeMode="contain"
                    style={{
                        width: 55,
                        height: 55,
                        transform: [{scale: scale}]
                    }}
                />
                </TouchableOpacity>
            </Animated.View> 
        )
    } */

  const dataView = (
    <FlatList
      data={props.data}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => item.url_et_id_onisep}
      renderItem={({ item }) => (
        <View
          style={{
            justifyContent: "center",
            marginTop: props.marginTop,
            marginBottom: props.marginBottom,
            paddingLeft: 25,
            paddingRight: 25,
          }}
        >
          {/*                 <Swipeable //When flalist is stable
                    renderRightActions={swip}
                    onActivated={() => setData(item)}
                > */}
          <View style={{ ...styles.formation }}>
            <View style={styles.headFormation}>
              <Text style={styles.starFormation}>
                {item.sigle_type_formation.charAt(0).toUpperCase() + item.sigle_type_formation.slice(1) || "Non Renseigné"}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (userToken) {
                    islog = true;
                    if (props.post && favoris.size > 0) {
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
                    } else {
                      DeleteFavoris(item.id);
                    }
                  } else {
                    const message = "Vous n'êtes pas connecter."
                    setMessages([...messages, message])
                  }

                }}
              >
                <Image
                  source={props.icon}
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
              {item.libelle_type_formation.charAt(0).toUpperCase() + item.libelle_type_formation.slice(1)}
            </Text>
            <Text style={{ marginBottom: 10, fontSize: 17 }} selectable={true}>
              {item.libelle_formation_principal.charAt(0).toUpperCase() + item.libelle_formation_principal.slice(1)}
            </Text>
          </View>
          {/*  </Swipeable> */}
        </View>
      )}
      initialNumToRender={18}
      ListHeaderComponent={header()}
      style={{
        backgroundColor: "#F7F7F7",
        width: "100%",
      }}
    />
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
