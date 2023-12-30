import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AccountTabStackNavigationParamsList } from "navigation/account/AccountTabStackNavigation.types";
import { FormationTabStackNavigationParamsList } from "navigation/formations/FormationTabStackNavigation.types";
import React, { useState } from "react";
import { StyleProp, TextStyle } from "react-native";

import { Input } from "$shared/ui/forms/Input";
import { Screen } from "$shared/ui/navigation/Screen";
import { Box } from "$shared/ui/primitives";

import { makeAppStyles } from "$shared/ui/theme/theme";
import { colors } from "../shared/ui/theme/colors";
import { BtnTextConn } from "../src/components/ui/BtnTextConn";
import { setCurrentUserStorage } from "../src/components/utils/currentUserStorage";
import { useConnexion } from "../src/hooks/user/useConnexion";

import { useCurrentUser } from "../src/hooks/user/useCurrentUser";

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { setCurrentUser } = useCurrentUser();

  const navigation =
    useNavigation<StackNavigationProp<FormationTabStackNavigationParamsList>>();
  const registerNavigation =
    useNavigation<StackNavigationProp<AccountTabStackNavigationParamsList>>();

  const { login } = useConnexion();

  const styles = useStyles();

  const activeBorder = (isWrited: boolean): StyleProp<TextStyle> => {
    return {
      borderColor: isWrited ? colors.PRIMARY_6 : colors.TRANSPARENT,
    };
  };

  const handleEnterInput = async () => {
    try {
      const formData = { email: email, password: password };
      const response = await login({ formData });
      const registeredUser = {
        accessToken: response.user.access,
        refreshToken: response.user.refresh,
        id: response.user.id,
        username: response.user.username,
      };
      setCurrentUser(registeredUser);
      setCurrentUserStorage(registeredUser);
      console.log(response);
      navigation.navigate("HomeScreen");
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <Screen title="Se connecter" goBack={false}>
      <Box py="global_15">
        <Input
          label="Email"
          placeholder="onisep_api@gmail.com"
          style={[styles.inputContainer, activeBorder(email.length > 0)]}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
      </Box>
      <Box py="global_15">
        <Input
          label="Mot de passe"
          placeholder="***********"
          style={[styles.inputContainer, activeBorder(password.length > 0)]}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          onSubmitEditing={handleEnterInput}
        />
      </Box>
      <BtnTextConn
        firstText="Pas enregistrer ?"
        secondText="Enregistre toi ici !"
        onPress={() => registerNavigation.navigate("RegisterScreen")}
      />
    </Screen>
  );
};

const useStyles = makeAppStyles(({ colors, spacing, borderRadii }) => ({
  inputContainer: {
    height: 48,
    borderWidth: 1.5,
    borderRadius: borderRadii.global_8,
    backgroundColor: colors.PRIMARY_3,
    paddingHorizontal: spacing.global_15,
  },
}));

export { LoginScreen };
