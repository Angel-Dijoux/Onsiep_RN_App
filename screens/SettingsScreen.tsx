import * as Clipboard from "expo-clipboard";
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  BackHandler,
} from "react-native";

/* local */
import { NoCurrentUser } from "./Settings/NoCurrentUser";
import { Screen } from "../shared/ui/navigation/Screen";
import { Box } from "../shared/ui/primitives";
import ProfilEdit from "../src/components/ui/button";
import SearchBar from "../src/components/ui/search";
import { AuthContext } from "../src/context/AuthContext";
import { useCurrentUser } from "../src/hooks/user/useCurrentUser";

const SettingsScreem = ({ navigation }) => {
  const { logout, DeleteUser, EditUser, userInfo, userTokenRefresh } =
    useContext(AuthContext);
  const { accessToken } = useCurrentUser();

  const [isedit, setEdit] = useState(false);
  const [visiblemodal, setVisibleModal] = useState(false);
  const [messages, setMessages] = useState([]);

  const [email, setemail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setpassword] = useState(null);
  const [oldpassword, setOldPassword] = useState(null);

  const handleBackButtonClick = () => {
    navigation.navigate("HomeScreen");
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

  const EditProfil = () => {
    if (isedit == false) {
      return <ProfilEdit text="Modifier" func={() => setEdit(!isedit)} />;
    } else {
      const editProfilView = (
        <View style={{ width: "100%" }}>
          <View>
            <SearchBar
              name="Email"
              search={email}
              icon={require("../src/icons/email.png")}
              func={(text) => setemail(text)}
              bg
              color
              mb={15}
            />
            <SearchBar
              name="Pseudo"
              icon={require("../src/icons/username.png")}
              search={username}
              func={(text) => {
                setUsername(text);
              }}
              bg
              color
              mb={15}
            />
            <SearchBar
              name="Ancien mot de passe"
              icon={require("../src/icons/password.png")}
              func={(text) => setOldPassword(text)}
              bg
              color
              mb={15}
            />
            <SearchBar
              name="Nouveau mot de passe"
              icon={require("../src/icons/password.png")}
              func={(text) => setpassword(text)}
              bg
              color
              mb={15}
            />
          </View>
          <View style={{ alignItems: "flex-end", marginTop: 5 }}>
            <ProfilEdit text="Enregistrer" func={() => verif_data_edit()} />
          </View>
        </View>
      );

      return editProfilView;
    }
  };

  const verif_data_edit = () => {
    if (username !== null && `${username}`.length < 3) {
      const message = "Le pseudo est trop court.";
      setMessages([...messages, message]);
    } else {
      const data = {
        username: username || "",
        name: "",
        pdp_url: "",
        email: email || "",
        password: password || "",
        old_password: oldpassword || "",
      };
      EditUser(data);
      const message = "Le profil a bien été modifier.";
      setMessages([...messages, message]);
    }
  };

  const is_log = () => {
    if (accessToken) {
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
                  "ss"
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
            {EditProfil()}
          </View>
        </View>
      );
    }
  };

  const warning_delete_modal = () => {
    const modal = (
      <Modal
        animationType="fade"
        transparent
        visible={visiblemodal}
        onRequestClose={() => setVisibleModal(!visiblemodal)}
      >
        <Box
          backgroundColor="TRANSPARENT_60"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
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
              données seront supprimé aucun retour en arrière n'est possible.
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
              <ProfilEdit
                text="Supprimer"
                func={() => DeleteUser()}
                width="40%"
              />
              <TouchableOpacity
                style={{
                  padding: 7,
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
        </Box>
      </Modal>
    );
    return modal;
  };

  const log_out = () => {
    if (!accessToken) {
      return (
        <View
          style={{
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
          <View>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setStringAsync(`${userTokenRefresh}`);
              }}
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
            </TouchableOpacity>
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
            <ProfilEdit text="Se déconnecter" func={() => logout()} />
            <ProfilEdit
              text="Supprimer mon compte"
              func={() => setVisibleModal(!visiblemodal)}
              width="55%"
            />
          </View>
          {warning_delete_modal()}
        </View>
      );
    } else {
      return (
        <View
          style={{
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
              text="Se connecter"
              func={() => navigation.navigate("Login")}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <Screen title="Paramètres" isScrollable edges={["top"]}>
      <NoCurrentUser />
    </Screen>
  );
};

export default SettingsScreem;
