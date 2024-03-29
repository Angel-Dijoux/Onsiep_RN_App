import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AccountTabStackNavigationParamsList } from "navigation/account/AccountTabStackNavigation.types";
import React, { useState } from "react";
import { StyleProp, TextStyle } from "react-native";

import { Button } from "$shared/ui/button/Button";
import { Input } from "$shared/ui/forms/Input";
import { Screen } from "$shared/ui/navigation/Screen";
import { Box, Text } from "$shared/ui/primitives";
import { makeAppStyles } from "$shared/ui/theme/theme";

import { colors } from "../shared/ui/theme/colors";
import { BtnTextConn } from "../src/components/ui/BtnTextConn";
import { useConnexion } from "../src/hooks/user/useConnexion";

export const activeBorder = (isWrited: boolean): StyleProp<TextStyle> => {
  return {
    borderColor: isWrited ? colors.PRIMARY_6 : colors.TRANSPARENT,
  };
};

const LoginScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const registerNavigation =
    useNavigation<StackNavigationProp<AccountTabStackNavigationParamsList>>();

  const { login, loginIsLoading } = useConnexion();

  const styles = useStyles();

  const shouldDisableButton = email.length > 0 && password.length > 0;

  const handleEnterInput = async () => {
    if (!shouldDisableButton) {
      return;
    }
    login({ email: email, password: password });
  };

  return (
    <Screen goBack={false}>
      <Box
        mt="global_40"
        mx="global_15"
        gap="global_15"
        justifyContent="center"
      >
        <Box my="global_8" alignItems="center">
          <Text variant="h2">Onisep Explorer</Text>
        </Box>
        <Input
          placeholder="Email"
          style={[styles.inputContainer, activeBorder(email.length > 0)]}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Input
          placeholder="Mot de passe"
          style={[styles.inputContainer, activeBorder(password.length > 0)]}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry
          onSubmitEditing={handleEnterInput}
        />
        <Button
          onPress={handleEnterInput}
          isLoading={loginIsLoading}
          variant={shouldDisableButton ? "primary" : "primaryDisabled"}
          isDisabled={!shouldDisableButton}
        >
          Se connecter
        </Button>
        <BtnTextConn
          firstText="Pas enregistrer ?"
          secondText="Enregistre toi ici !"
          onPress={() => registerNavigation.navigate("RegisterScreen")}
        />
      </Box>
    </Screen>
  );
};

const useStyles = makeAppStyles(({ colors, spacing, borderRadii }) => ({
  inputContainer: {
    borderWidth: 1.5,
    borderRadius: borderRadii.global_8,
    backgroundColor: colors.PRIMARY_3,
    paddingHorizontal: spacing.global_15,
    paddingVertical: spacing.global_10,
  },
}));

export { LoginScreen };
