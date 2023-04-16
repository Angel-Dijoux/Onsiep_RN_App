import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNetInfo } from "@react-native-community/netinfo";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

import { BASE_URL } from "../default.config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [favoris, setfavoris] = useState([]);

  const netInfo = useNetInfo();

  const [isloading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userTokenRefresh, setUserTokenRefresh] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [messages, setMessages] = useState([]);

  const register = (email, password, username) => {
    data = {
      username: username,
      name: "null",
      email: email,
      password: password,
    };
    console.info("request on : ", `${BASE_URL}/auth/register`);
    fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          const message = `${data.error}.`;
          setMessages([...messages, message]);
        } else {
          const message = "Votre compte a été créé.";
          setUserInfo([...message, message]);
          setTimeout(() => {
            login(data.user.email, password);
          }, 700);
        }
      })
      .catch((e) => {
        console.log("Error in register Function", e);
      });
  };

  const login = (email, password) => {
    setLoading(true);
    console.info("request on : ", `${BASE_URL}/auth/login`);
    axios
      .post(`${BASE_URL}/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo.user);
        setUserToken(userInfo.user.access);
        setUserTokenRefresh(userInfo.user.refresh);

        AsyncStorage.setItem("userToken", userInfo.user.access);
        AsyncStorage.setItem("refreshToken", userInfo.user.refresh);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo.user));
      })
      .catch((e) => {
        const message = "Identifiants erronés.";
        setMessages([...messages, message]);
      });
    setLoading(false);
  };

  const refresh_token = (TOKEN) => {
    return new Promise((resolve) => {
      setLoading(true);
      console.info("request on : ", `${BASE_URL}/auth/token/refresh`);
      const API_LINK = `${BASE_URL}/auth/token/refresh`;

      fetch(API_LINK, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + TOKEN, //use authentification with token
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          resolve(data.access);
        })
        .catch((e) => {
          console.log("Error in REFRESH_TOKEN Function : ", e);
        });
      setLoading(false);
    });
  };

  const EditUser = async (data) => {
    let TOKEN = await refresh_token(userTokenRefresh);
    if (TOKEN == undefined) {
      TOKEN = userToken;
    }
    console.info("request on : ", `${BASE_URL}/auth/me/edit`);
    await fetch(`${BASE_URL}/auth/me/edit`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + TOKEN,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const NewUserInfo = {
          access: userToken,
          email: data.user.email,
          refresh: userTokenRefresh,
          username: data.user.username,
        };

        setUserInfo(NewUserInfo);
        setUserToken(NewUserInfo.access);
        setUserTokenRefresh(NewUserInfo.refresh);

        console.log(JSON.stringify(NewUserInfo));

        AsyncStorage.setItem("userToken", NewUserInfo.access);
        AsyncStorage.setItem("refreshToken", NewUserInfo.refresh);
        AsyncStorage.setItem("userInfo", JSON.stringify(NewUserInfo));
      })
      .catch((e) => {
        console.log("Error in EditUser Function", e);
      });
  };

  const logout = () => {
    setLoading(true);
    setUserToken(null);
    setUserInfo(null);
    setUserTokenRefresh(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("refreshToken");
    AsyncStorage.removeItem("favoris");
    setLoading(false);
  };

  const DeleteUser = async () => {
    let TOKEN = await refresh_token(userTokenRefresh);
    if (TOKEN == undefined) {
      TOKEN = userToken;
    }
    console.info("request on : ", `${BASE_URL}/auth/me/remove`);
    axios
      .delete(`${BASE_URL}/auth/me/remove`, {
        headers: {
          Authorization: "Bearer " + TOKEN || userToken, //use authentification with token
        },
      })
      .then(() => {
        logout();
        console.log("is delete");
      })
      .catch((e) => {
        console.log("Error in Function DeleteUser : ", e);
      });
  };

  const isLoggedIn = async () => {
    try {
      setLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let refreshToken = await AsyncStorage.getItem("refreshToken");
      let userToken = await AsyncStorage.getItem("userToken");
      let favoris = await AsyncStorage.getItem("favoris");

      userInfo = JSON.parse(userInfo);
      favoris = JSON.parse(favoris);

      if (userInfo) {
        setUserTokenRefresh(refreshToken);
        setUserInfo(userInfo);
        setUserToken(userToken);
        setfavoris(favoris);
      }
      setLoading(false);
    } catch (e) {
      console.log("isLoggedIn Function Error : ", e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        refresh_token,
        DeleteUser,
        register,
        EditUser,
        isloading,
        userToken,
        userTokenRefresh,
        userInfo,
        messages,
        setMessages,

        setfavoris,
        favoris,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
