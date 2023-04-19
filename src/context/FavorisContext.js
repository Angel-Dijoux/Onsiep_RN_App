import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useContext } from "react";

import { AuthContext } from "./AuthContext";
import { BASE_URL } from "../config";

export const FavorisContext = createContext();

export const FavorisProvider = ({ children }) => {
  const { refresh_token, userTokenRefresh, userToken, setfavoris, favoris } =
    useContext(AuthContext);

  const [favisloading, setFavLoading] = useState();

  const GetFavoris = async () => {
    setFavLoading(true);
    let TOKEN = await refresh_token(userTokenRefresh);
    if (TOKEN == undefined) {
      TOKEN = userToken;
    }
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/favoris/`, {
          headers: {
            Authorization: "Bearer " + TOKEN || userToken, // use authentification with token
          },
        })
        .then((res) => {
          let userLink = res.data;
          AsyncStorage.setItem("favoris", JSON.stringify(userLink));
          setfavoris(userLink);
          console.info("data is get");
          setFavLoading(false);
        })
        .catch((e) => {
          console.log("Error in Function get_fav : ", e);
        });
    }, 150);
  };

  const PostFavoris = async (
    code_nsf,
    sigle_type_formation,
    libelle_type_formation,
    libelle_formation_principal,
    sigle_formation,
    duree,
    niveau_de_sortie_indicatif,
    code_rncp,
    niveau_de_certification,
    libelle_niveau_de_certification,
    tutelle,
    url_et_id_onisep
  ) => {
    let TOKEN = await refresh_token(userTokenRefresh);
    if (TOKEN == undefined) {
      TOKEN = userToken;
    }
    const bodyParameters = {
      code_nsf: code_nsf,
      sigle_type_formation: sigle_type_formation,
      libelle_type_formation: libelle_type_formation,
      libelle_formation_principal: libelle_formation_principal,
      sigle_formation: sigle_formation,
      duree: duree,
      niveau_de_sortie_indicatif: niveau_de_sortie_indicatif,
      code_rncp: code_rncp,
      niveau_de_certification: niveau_de_certification,
      libelle_niveau_de_certification: libelle_niveau_de_certification,
      tutelle: tutelle,
      url_et_id_onisep: url_et_id_onisep,
    };
    try {
      await fetch(`${BASE_URL}/favoris/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + TOKEN,
        },
        body: JSON.stringify(bodyParameters),
      });
      console.log("Data is post");
    } catch (e) {
      console.log("Error in PostFavoris : ", e);
    }
  };

  const DeleteFavoris = async (id) => {
    let TOKEN = await refresh_token(userTokenRefresh);
    if (TOKEN == undefined) {
      TOKEN = userToken;
    }
    axios
      .delete(`${BASE_URL}/favoris/${id}`, {
        headers: {
          Authorization: "Bearer " + TOKEN || userToken, // use authentification with token
        },
      })
      .then(() => {
        console.info("is delete");
        GetFavoris();
      })
      .catch((e) => {
        console.log("Error in Function DeleteFavoris : ", e);
      });
  };

  return (
    <FavorisContext.Provider
      value={{ DeleteFavoris, PostFavoris, GetFavoris, favisloading }}
    >
      {children}
    </FavorisContext.Provider>
  );
};
