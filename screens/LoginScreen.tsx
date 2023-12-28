import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AccountTabStackNavigationParamsList } from "navigation/account/AccountTabStackNavigation.types";
import { FormationTabStackNavigationParamsList } from "navigation/formations/FormationTabStackNavigation.types";
import React, { useState } from "react";

import { ScreenWithImage } from "../shared/ui/ScreenWithImage";
import { colors } from "../shared/ui/primitives/theme/colors";
import { BtnTextConn } from "../src/components/ui/BtnTextConn";
import { InputField } from "../src/components/ui/inputs/InputField";
import { setCurrentUserStorage } from "../src/components/utils/currentUserStorage";
import { useConnexion } from "../src/hooks/user/useConnexion";

const LoginScreen = () => {
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const navigation =
    useNavigation<StackNavigationProp<FormationTabStackNavigationParamsList>>();
  const registerNavigation =
    useNavigation<StackNavigationProp<AccountTabStackNavigationParamsList>>();

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
      navigation.navigate("HomeScreen");
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
        onPress={() => registerNavigation.navigate("RegisterScreen")}
      />
    </ScreenWithImage>
  );
};
export { LoginScreen };
