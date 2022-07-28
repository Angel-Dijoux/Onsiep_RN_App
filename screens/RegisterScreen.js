import React, { useState, useContext } from "react";

import {
  Text,
  View,
  TextInput,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../src/context/AuthContext";

import SearchBar from "../src/components/ui/search";

const RegisterScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);

  const [username, setusername] = useState(null);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);

  const form = (
    <View
      style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}
    >
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
          height: "65%",
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
            S'enregsitrer
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 25 }}>
          <SearchBar
            icon={require("../src/icons/email.png")}
            name={"Email"}
            func={(text) => setemail(text)}
            mb={15}
          />
          <SearchBar
            icon={require("../src/icons/username.png")}
            name={"Pseudo"}
            func={(text) => setusername(text)}
            mb={15}
          />
          <SearchBar
            icon={require("../src/icons/password.png")}
            name={"Mot de passe"}
            func={(text) => setpassword(text)}
            subfunc={() => {
              register(email, password, username);
            }}
            mb={2}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ marginLeft: 20 }}>Tu as un compte ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ fontWeight: "700" }}>Connecte toi ici !</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
  return form;
};
export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
