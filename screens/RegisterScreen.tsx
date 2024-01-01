import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AccountTabStackNavigationParamsList } from "navigation/account/AccountTabStackNavigation.types";
import React, { useState } from "react";

import { Button } from "$shared/ui/button/Button";
import { Input } from "$shared/ui/forms/Input";
import { Screen } from "$shared/ui/navigation/Screen";
import { Box, Text } from "$shared/ui/primitives";
import { makeAppStyles } from "$shared/ui/theme/theme";

import { activeBorder } from "./LoginScreen";
import { BtnTextConn } from "../src/components/ui/BtnTextConn";
import { RegisteredUser, useConnexion } from "../src/hooks/user/useConnexion";

const RegisterScreen = () => {
  const { register } = useConnexion();

  const [newUser, setNewUser] = useState<RegisteredUser>({
    email: "",
    password: "",
    checkPassword: "",
    username: "",
  });

  const registerNavigation =
    useNavigation<StackNavigationProp<AccountTabStackNavigationParamsList>>();

  const styles = useStyles();

  const allPropertiesSet = Object.values(newUser).every(
    (prop) => prop !== undefined && prop !== ""
  );

  const handleEnterInput = async () => {
    if (!allPropertiesSet) {
      return;
    }
    await register(newUser);
  };

  return (
    <Screen goBack>
      <Box mx="global_15" gap="global_15" justifyContent="center">
        <Box my="global_8" alignItems="center">
          <Text variant="h2">Onisep Explorer</Text>
        </Box>
        <Input
          placeholder="Email"
          value={newUser.email}
          style={[
            styles.inputContainer,
            activeBorder(newUser.email.length > 0),
          ]}
          onChangeText={(text) => {
            setNewUser({
              ...newUser,
              email: text,
            });
          }}
          keyboardType="email-address"
        />

        <Input
          placeholder="Nom d'utilisateur"
          value={newUser.username}
          style={[
            styles.inputContainer,
            activeBorder(newUser.username.length > 0),
          ]}
          onChangeText={(text) => {
            setNewUser({
              ...newUser,
              username: text,
            });
          }}
        />
        <Input
          placeholder="Mot de passe"
          value={newUser.password}
          style={[
            styles.inputContainer,
            activeBorder(newUser.password.length > 0),
          ]}
          onChangeText={(text) => {
            setNewUser({
              ...newUser,
              password: text,
            });
          }}
          secureTextEntry
        />
        <Input
          placeholder="Confirmer le mot de passe"
          value={newUser.checkPassword}
          style={[
            styles.inputContainer,
            activeBorder(newUser.checkPassword.length > 0),
          ]}
          onChangeText={(text) => {
            setNewUser({
              ...newUser,
              checkPassword: text,
            });
          }}
          secureTextEntry
          onSubmitEditing={handleEnterInput}
        />
        <Button
          onPress={handleEnterInput}
          variant={allPropertiesSet ? "primary" : "primaryDisabled"}
          isDisabled={!allPropertiesSet}
        >
          S'enregistrer
        </Button>
        <BtnTextConn
          firstText="Tu as un compte ?"
          secondText="Connecte toi ici !"
          onPress={() => registerNavigation.navigate("LoginScreen")}
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

export { RegisterScreen };
