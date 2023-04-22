import React, { useState, useContext } from "react";

import { ScreenWithImage } from "../shared/ui/ScreenWithImage";
import { BtnTextConn } from "../src/components/ui/BtnTextConn";
import SearchBar from "../src/components/ui/search";
import { AuthContext } from "../src/context/AuthContext";

import { useConnexion } from "../src/hooks/user/useConnexion";
import { setCurrentUserStorage } from "../src/components/utils/currentUserStorage";

const LoginScreen = ({ navigation }) => {
  // const { login } = useContext(AuthContext);
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const { login } = useConnexion();

  const handleEnterInput = async () => {
    try {
      const formData = { email: email, password: password };
      const response = await login({ formData });
      console.log(response);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <ScreenWithImage title="Se connecter">
      <SearchBar
        icon={require("../src/icons/email.png")}
        name="Email"
        func={(text) => setemail(text)}
        type="email-address"
        mb={30}
      />
      <SearchBar
        icon={require("../src/icons/password.png")}
        name="Mot de passe"
        func={(text) => setpassword(text)}
        subfunc={handleEnterInput}
        password
        mb={2}
      />
      <BtnTextConn
        firstText="Pas enregistrer ?"
        secondText="Enregistre toi ici !"
        onPress={() => navigation.navigate("register")}
      />
    </ScreenWithImage>
  );
};
export { LoginScreen };
