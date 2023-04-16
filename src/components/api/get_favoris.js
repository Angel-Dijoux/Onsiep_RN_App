import axios from "axios";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../default.config";

const get_fav = () => {
  const { userToken } = useContext(AuthContext);

  axios
    .get(`${BASE_URL}/favoris/`, {
      headers: {
        Authorization: "Bearer " + userToken, // use authentification with token
      },
    })
    .then((res) => {
      let userLink = res.data;
      console.log("A");
    })
    .catch((e) => {
      console.log("Error in Function get_fav : ", e);
    });
};

export default get_fav;
