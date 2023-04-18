import React, { useState, useContext } from "react";

import { ScreenWithImage } from "../shared/ui/ScreenWithImage";
import { BtnTextConn } from "../src/components/ui/BtnTextConn";
import SearchBar from "../src/components/ui/search";
import { AuthContext } from "../src/context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);

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
        subfunc={() => {
          login(email, password);
        }}
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
