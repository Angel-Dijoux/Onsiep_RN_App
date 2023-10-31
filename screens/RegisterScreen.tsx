import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";

import { ScreenWithImage } from "../shared/ui/ScreenWithImage";
import { colors } from "../shared/ui/primitives/theme/colors";
import { BtnTextConn } from "../src/components/ui/BtnTextConn";
import { InputField } from "../src/components/ui/inputs/InputField";
import { setCurrentUserStorage } from "../src/components/utils/currentUserStorage";
import { useConnexion } from "../src/hooks/user/useConnexion";

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
        navigation.navigate("HomeScreen");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <ScreenWithImage title="S'enregistrer" canGoBack>
      <InputField
        title="Email"
        value={email}
        type="email-address"
        onChange={(text) => {
          setemail(text);
        }}
      >
        <AntDesign name="mail" size={24} color={colors.PRIMARY_12} />
      </InputField>
      <InputField
        title="Pseudo"
        value={username}
        onChange={(text) => {
          setusername(text);
        }}
      >
        <AntDesign name="user" size={24} color={colors.PRIMARY_12} />
      </InputField>
      <InputField
        title="Mot de passe"
        password
        value={password}
        onChange={(text) => {
          setpassword(text);
        }}
        onSubmitEditing={handleEnterInput}
      >
        <AntDesign name="key" size={24} color={colors.PRIMARY_12} />
      </InputField>
      <BtnTextConn
        firstText="Tu as un compte ?"
        secondText="Connecte toi ici !"
        onPress={() => navigation.navigate("LoginScreen")}
      />
    </ScreenWithImage>
  );
};
export { RegisterScreen };
