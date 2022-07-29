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

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);

  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  const login_form = (
    <SafeAreaView
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
              mb={30}
            />
            <SearchBar
              icon={require("../src/icons/password.png")}
              name={"Mot de passe"}
              func={(text) => setpassword(text)}
              subfunc={() => {
                login(email, password);
              }}
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
