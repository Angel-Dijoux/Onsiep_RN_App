import React, { useState, useContext } from "react";
import { Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Screen } from "../shared/ui/navigation/Screen";
import { Box, Text } from "../shared/ui/primitives";
import DisplayMessages from "../src/components/ui/Notification/display_messages";
import SearchBar from "../src/components/ui/search";
import { AuthContext } from "../src/context/AuthContext";

const RegisterScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);

  const [username, setusername] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

  const form = (
    <SafeAreaView
      style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end" }}
    >
      <DisplayMessages />
      <ImageBackground
        source={require("../src/icons/onilogo.png")}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "70%",
          position: "relative",
          marginBottom: "65%",
        }}
      ></ImageBackground>
      <Box
        width="100%"
        height={SCREEN_HEIGHT / 1.75}
        position="absolute"
        backgroundColor="SECONDARY_40"
        borderTopLeftRadius="global_16"
        borderTopRightRadius="global_16"
      >
        <Screen
          title="S'enregistrer"
          goBack
          isScrollable={false}
          edges={["top"]}
        >
          <Box mt="global_24">
            <SearchBar
              icon={require("../src/icons/email.png")}
              name="Email"
              func={(text) => setemail(text)}
              type="email-address"
              mb={15}
            />
            <SearchBar
              icon={require("../src/icons/username.png")}
              name="Pseudo"
              func={(text) => setusername(text)}
              mb={15}
            />
            <SearchBar
              icon={require("../src/icons/password.png")}
              name="Mot de passe"
              func={(text) => setpassword(text)}
              subfunc={() => {
                register(email, password, username);
              }}
              password
              mb={2}
            />
            <Box flexDirection="row" justifyContent="flex-start" mt="global_5">
              <Text ml="global_15" color="GREY_DARK">
                Tu as un compte ?{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text color="THIRD_DARK" fontWeight="700">
                  Connecte toi ici !
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Screen>
      </Box>
    </SafeAreaView>
  );
  return form;
};
export { RegisterScreen };
