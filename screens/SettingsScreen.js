import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
/*local*/
import LoginScreen from "../screens/LoginScreen";
import ProfilEdit from "../src/components/ui/button";
import SearchBar from "../src/components/ui/search";
import ItemSeparator from "../src/components/ui/item_seperator";
import VirtualizedView from "./scrool";
import { AuthContext } from "../src/context/AuthContext";

const SettingsScreem = ({ navigation }) => {
  const { logout, DeleteUser, userInfo, userTokenRefresh, userToken } =
    useContext(AuthContext);

  const [iscliked, setCliked] = useState(false);
  const [isedit, setEdit] = useState(false);
  const [istitle, setTitle] = useState("");
  const [visiblemodal, setVisibleModal] = useState(false);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setCliked(true);
          setTitle(item.title);
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
          }}
        >
          <Text style={{ padding: 12 }}>{item.title}</Text>
          <Image
            source={turnDetailsButton(item)}
            resizeMode="contain"
            style={{
              width: 22,
              height: 22,
              alignSelf: "center",
              marginRight: 15,
            }}
          />
        </View>
        {showSupportDetails(item)}
      </TouchableOpacity>
    );
  };

  const activeEditProfil = () => {
    if (isedit == false) {
      return <ProfilEdit text={"Modifier"} func={() => setEdit(!isedit)} />;
    } else {
      const editProfilView = (
        <View style={{ width: "100%" }}>
          <View>
            <SearchBar
              name={"Email"}
              search={userInfo.email}
              icon={require("../src/icons/email.png")}
            />
            <SearchBar
              name={"Pseudo"}
              icon={require("../src/icons/username.png")}
            />
            <SearchBar
              name={"Ancien mot de passe"}
              icon={require("../src/icons/password.png")}
            />
            <SearchBar
              name={"Nouveau mot de passe"}
              icon={require("../src/icons/password.png")}
            />
          </View>
          <View style={{ alignItems: "flex-end", marginTop: 5 }}>
            <ProfilEdit text={"Enregistrer"} func={() => setEdit(!isedit)} />
          </View>
        </View>
      );
      return editProfilView;
    }
  };
  const showSupportDetails = (item) => {
    if (iscliked && item.title == istitle) {
      const view = (
        <View style={{ padding: 20, marginLeft: 15, marginRight: 25 }}>
          <Text style={{ color: "#767474" }}>{item.description}</Text>
        </View>
      );
      return view;
    }
  };

  const turnDetailsButton = (item) => {
    if (iscliked && item.title == istitle) {
      return require("../src/icons/more_90.png");
    } else {
      return require("../src/icons/more.png");
    }
  };

  const is_log = () => {
    if (userToken) {
      return (
        <View
          style={{
            flexDirection: "column",
            padding: 8,
            backgroundColor: "#FFD400",
            borderRadius: 8,
            marginTop: 12,
          }}
        >
          <Text
            style={{
              paddingLeft: 12,
              paddingTop: 10,
              fontSize: 15,
              color: "#030402",
              opacity: 0.5,
            }}
          >
            Mon compte
          </Text>
          <View
            style={{
              flexDirection: isedit ? "column" : "row",
              alignItems: "center",
              justifyContent: isedit ? "center" : "space-between",
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: isedit ? "column" : "row",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblog.depositphotos.com%2Fwp-content%2Fuploads%2F2020%2F04%2FPhoto-editing-tips-for-stock-photography-platforms.jpg&f=1&nofb=1",
                }}
                resizeMode="contain"
                style={{
                  width: isedit ? 120 : 70,
                  height: isedit ? 120 : 70,
                  borderRadius: 120,
                  alignSelf: "center",
                }}
              />
              <View
                style={{
                  padding: 2,
                  marginLeft: isedit ? 0 : 8,
                  marginTop: isedit ? 8 : 0,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: isedit ? 28 : 16,
                    marginBottom: isedit ? 10 : 0,
                  }}
                >
                  {userInfo.username}
                </Text>
                <Text
                  style={{
                    color: "#030402",
                    opacity: 0.5,
                    textAlign: "center",
                    fontStyle: "italic",
                    fontSize: isedit ? 14 : 12,
                  }}
                >
                  {isedit ? "Profil" : "Modifier votre profil"}
                </Text>
              </View>
            </View>
            {activeEditProfil()}
          </View>
        </View>
      );
    }
  };

  const warning_delete_modal = () => {
    const modal = (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visiblemodal}
        onRequestClose={() => setVisibleModal(!visiblemodal)}
      >
        <View
          style={{
            backgroundColor: "rgba(52, 52, 52, 0.2)",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <View
            style={{
              backgroundColor: "#F7F7F7",
              padding: 15,
              width: "75%",
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                marginBottom: 10,
                fontSize: 18,
                color: "#C52E25",
              }}
            >
              Supprimer mon compte
            </Text>
            <Text style={{ fontSize: 17 }}>
              Attention ! la suppression du compte est irréversible, toutes les
              données ne seront supprimé aucun retour en arrière n'est possible.
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 25,
              }}
            >
              <ProfilEdit text={"Supprimer"} func={() => DeleteUser()} />
              <TouchableOpacity
                style={{
                  padding: 8,
                  width: "40%",
                  borderRadius: 35,
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
                onPress={() => {
                  setVisibleModal(!visiblemodal);
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 17,
                  }}
                >
                  Annuler
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
    return modal;
  };

  const log_out = () => {
    if (userToken) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            borderStyle: "solid",
            borderColor: "#C52E25",
            borderWidth: 1.3,
            borderRadius: 8,
            marginTop: 20,
            padding: 15,
          }}
        >
          <Text
            style={{
              paddingLeft: 5,
              marginBottom: 25,
              fontSize: 18,
              color: "#C52E25",
            }}
          >
            Zone de danger
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "900", fontSize: 16 }}> Token : </Text>
            <Text
              style={{ width: "65%", fontSize: 16 }}
              multiline={false}
              numberOfLines={1}
            >
              {userTokenRefresh}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "800",
              paddingLeft: 5,
              marginTop: 2,
            }}
          >
            (votre token de rafraîchissement permet d’accéder à vos données il
            n’est PAS à partager)
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginTop: 20,
            }}
          >
            <ProfilEdit text={"Se déconnecter"} func={() => logout()} />
            <ProfilEdit
              text={"Supprimer mon compte"}
              func={() => setVisibleModal(!visiblemodal)}
            />
          </View>
          {warning_delete_modal()}
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            borderStyle: "solid",
            borderColor: "#C52E25",
            borderWidth: 1.3,
            borderRadius: 8,
            marginTop: 20,
            padding: 15,
          }}
        >
          <Text
            style={{
              paddingLeft: 5,
              marginBottom: 25,
              fontSize: 18,
              color: "#C52E25",
            }}
          >
            Vous n'êtes pas connecter
          </Text>
          <View style={{ alignItems: "flex-start", marginTop: 15 }}>
            <ProfilEdit
              text={"Se connecter"}
              func={() => navigation.navigate("Login")}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedView>
        <View style={{ padding: 10, marginBottom: 55 }}>
          {is_log()}
          <View
            style={{
              flexDirection: "column",
              padding: 5,
              marginTop: 15,
              backgroundColor: "#FFD400",
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                paddingLeft: 12,
                paddingTop: 10,
                fontSize: 15,
                color: "#030402",
                opacity: 0.5,
              }}
            >
              Support
            </Text>
            <FlatList
              data={[
                { id: 1, title: "Note de mise à jour ", description: "sds" },
                { id: 2, title: "À propos", description: "dede" },
                { id: 3, title: "Aide", description: "dede" },
                { id: 4, title: "Nous contacter", description: "dede" },
              ]}
              renderItem={renderItem}
              ItemSeparatorComponent={() => {
                return <ItemSeparator />;
              }}
              style={{
                marginBottom: 10,
                marginTop: 5,
              }}
            />
          </View>
          {log_out()}
        </View>
      </VirtualizedView>
    </SafeAreaView>
  );
};

export default SettingsScreem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F7F7F7",
  },
});
