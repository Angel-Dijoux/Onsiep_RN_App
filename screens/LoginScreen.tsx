import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";

import { ScreenWithImage } from "../shared/ui/ScreenWithImage";
import { colors } from "../shared/ui/primitives/theme/colors";
import { BtnTextConn } from "../src/components/ui/BtnTextConn";
import { InputField } from "../src/components/ui/inputs/InputField";
import { setCurrentUserStorage } from "../src/components/utils/currentUserStorage";
import { useConnexion } from "../src/hooks/user/useConnexion";

const LoginScreen = ({ navigation }) => {
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const { login } = useConnexion();

  const handleEnterInput = async () => {
    try {
      const formData = { email: email, password: password };
      const response = await login({ formData });
      setCurrentUserStorage({
        id: response.user.id,
        username: String(response.user.username),
        accessToken: String(response.user.access),
        refreshToken: String(response.user.refresh),
      });
      console.log(response);
      navigation.navigate("Home");
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <ScreenWithImage title="Se connecter" canGoBack={false}>
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
        firstText="Pas enregistrer ?"
        secondText="Enregistre toi ici !"
        onPress={() => navigation.navigate("RegisterScreen")}
      />
    </ScreenWithImage>
  );
};
export { LoginScreen };
