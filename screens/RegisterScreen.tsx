import React, { useState } from "react";

import { ScreenWithImage } from "../shared/ui/ScreenWithImage";
import { InputField } from "../src/components/ui/inputs/InputField";
import { BtnTextConn } from "../src/components/ui/BtnTextConn";
import SearchBar from "../src/components/ui/search";
import { setCurrentUserStorage } from "../src/components/utils/currentUserStorage";
import { useConnexion } from "../src/hooks/user/useConnexion";

import { AntDesign } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }) => {
  const { register, login } = useConnexion();

  const [username, setusername] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const handleEnterInput = async () => {
    try {
      const formData = {
        email: email,
        password: password,
        name: "",
        username: username,
      };
      const registerUser = await register({ formData });
      if (registerUser) {
        const response = await login({
          formData: {
            email: registerUser.user.email,
            password: formData.password,
          },
        });
        console.log(response.user.refresh);
        setCurrentUserStorage({
          id: 1,
          username: String(response.user.usename),
          accessToken: String(response.user.access),
          refreshToken: String(response.user.refresh),
        });
        navigation.navigate("Home");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <ScreenWithImage title="S'enregistrer">
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
      <InputField
        title="Mot de passe"
        password
        value={password}
        onSubmitEditing={handleEnterInput}
      >
        <AntDesign name="key" size={24} color="black" />
      </InputField>
      <BtnTextConn
        firstText="Tu as un compte ?"
        secondText="Connecte toi ici !"
        onPress={() => navigation.navigate("Login")}
      />
    </ScreenWithImage>
  );
};
export { RegisterScreen };
