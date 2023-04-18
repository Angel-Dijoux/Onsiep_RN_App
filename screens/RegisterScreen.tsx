import React, { useState, useContext } from "react";

import { ScreenWithImage } from "../shared/ui/ScreenWithImage";
import { BtnTextConn } from "../src/components/ui/BtnTextConn";
import SearchBar from "../src/components/ui/search";
import { AuthContext } from "../src/context/AuthContext";

const RegisterScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);

  const [username, setusername] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");

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
      <SearchBar
        icon={require("../src/icons/password.png")}
        name="Mot de passe"
        func={(text) => setpassword(text)}
        subfunc={() => {
          register(email, password, username);
        }}
        password
        mb={2}
      />

      <BtnTextConn
        firstText="Tu as un compte ?"
        secondText="Connecte toi ici !"
        onPress={() => navigation.navigate("Login")}
      />
    </ScreenWithImage>
  );
};
export { RegisterScreen };
