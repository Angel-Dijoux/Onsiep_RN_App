import React, { useState, useContext } from "react";

import {
  Text,
  View,
  TextInput,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AuthContext } from "../src/context/AuthContext";

import SearchBar from "../src/components/ui/search";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Message from "../src/components/ui/notif";

const LoginScreen = ({ navigation }) => {
  const { login, messages, setMessages } = useContext(AuthContext);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);

  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  const display_message = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: 45,
          left: 0,
          right: 0,
        }}
      >
        {messages.map((message) => (
          <Message
            key={message}
            message={message}
            onHide={() => {
              setMessages((messages) =>
                messages.filter((currentMessage) => currentMessage !== message)
              );
            }}
          />
        ))}
      </View>
    );
  };

  const login_form = (
    <SafeAreaView
      style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}
    >
      {display_message()}
      <ImageBackground
        source={require("../src/icons/onilogo.png")}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "85%",
          position: "relative",
          marginBottom: "40%",
        }}
      ></ImageBackground>
      <View
        style={{
          flex: 1,
          backgroundColor: "#F7F7F7",
          padding: 18,
          height: SCREEN_HEIGHT / 1.75,
          width: "100%",
          position: "absolute",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Image
            source={require("../src/icons/back.png")}
            resizeMode="contain"
            style={{ width: 30, height: 30 }}
          />
          <Text style={{ marginLeft: 15, fontSize: 20, fontWeight: "900" }}>
            Se connecter
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 25 }}>
          <ScrollView>
            <SearchBar
              icon={require("../src/icons/email.png")}
              name={"Email"}
              func={(text) => setemail(text)}
              type={"email-address"}
              mb={30}
            />
            <SearchBar
              icon={require("../src/icons/password.png")}
              name={"Mot de passe"}
              func={(text) => setpassword(text)}
              subfunc={() => {
                login(email, password);
              }}
              password={true}
              mb={2}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ marginLeft: 20 }}>Pas enregistrer ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("register")}>
                <Text style={{ fontWeight: "700" }}>Enregistre toi ici !</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
  return login_form;
};
export default LoginScreen;
