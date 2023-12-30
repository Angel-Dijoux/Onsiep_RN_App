import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AccountTabStackNavigationParamsList } from "navigation/account/AccountTabStackNavigation.types";
import { FormationTabStackNavigationParamsList } from "navigation/formations/FormationTabStackNavigation.types";
import React, { useState } from "react";

import { Screen } from "$shared/ui/navigation/Screen";

import { colors } from "../shared/ui/theme/colors";
import { BtnTextConn } from "../src/components/ui/BtnTextConn";
import { InputField } from "../src/components/ui/inputs/InputField";
import { setCurrentUserStorage } from "../src/components/utils/currentUserStorage";
import { useConnexion } from "../src/hooks/user/useConnexion";
import { useCurrentUser } from "../src/hooks/user/useCurrentUser";

const RegisterScreen = () => {
  const { register, login } = useConnexion();
  const { setCurrentUser } = useCurrentUser();

  const [username, setusername] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const navigation =
    useNavigation<StackNavigationProp<FormationTabStackNavigationParamsList>>();
  const registerNavigation =
    useNavigation<StackNavigationProp<AccountTabStackNavigationParamsList>>();

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
        const registeredUser = {
          accessToken: response.user.access,
          refreshToken: response.user.refresh,
          id: response.user.id,
          username: response.user.username,
        };
        setCurrentUser(registeredUser);
        setCurrentUserStorage(registeredUser);
        navigation.navigate("HomeScreen");
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <Screen title="S'enregistrer" goBack>
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
        onPress={() => registerNavigation.navigate("LoginScreen")}
      />
    </Screen>
  );
};
export { RegisterScreen };
